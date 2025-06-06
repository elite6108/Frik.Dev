import { type ActionFunctionArgs } from '@remix-run/cloudflare';
import { MAX_RESPONSE_SEGMENTS, MAX_TOKENS } from '~/lib/.server/llm/constants';
import { CONTINUE_PROMPT } from '~/lib/.server/llm/prompts';
import { streamText, type Messages, type StreamingOptions } from '~/lib/.server/llm/stream-text';
import SwitchableStream from '~/lib/.server/llm/switchable-stream';

export async function action(args: ActionFunctionArgs) {
  const { request, context } = args;
  
  try {
    // Determine request type - AI SDK uses form data, our frontend might use JSON directly
    const contentType = request.headers.get('content-type') || '';
    let messages: Messages;
    
    if (contentType.includes('application/json')) {
      const body = await request.json() as { messages: Messages };
      messages = body.messages;
      
      // Log the messages for debugging
      console.log('Received JSON request with', messages.length, 'messages');
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && typeof lastMessage.content !== 'string') {
        console.log('Last message has multimodal content with', Array.isArray(lastMessage.content) ? lastMessage.content.length : 'unknown', 'items');
      }
    } else {
      // FormData from AI SDK
      const formData = await request.formData();
      const messagesStr = formData.get('messages');
      
      if (typeof messagesStr !== 'string') {
        throw new Error('Invalid messages format');
      }
      
      messages = JSON.parse(messagesStr) as Messages;
      console.log('Parsed FormData request with', messages.length, 'messages');
    }
    
    // Create a stream for the response
    const stream = new SwitchableStream();
    
    const options: StreamingOptions = {
      toolChoice: 'none',
      onFinish: async ({ text: content, finishReason }) => {
        if (finishReason !== 'length') {
          return stream.close();
        }
        
        if (stream.switches >= MAX_RESPONSE_SEGMENTS) {
          throw new Error('Cannot continue message: Maximum segments reached');
        }
        
        const switchesLeft = MAX_RESPONSE_SEGMENTS - stream.switches;
        console.log(`Reached max token limit (${MAX_TOKENS}): Continuing message (${switchesLeft} switches left)`);
        
        messages.push({ role: 'assistant', content });
        messages.push({ role: 'user', content: CONTINUE_PROMPT });
        
        const result = await streamText(messages, context.cloudflare.env, options);
        return stream.switchSource(result.toAIStream());
      },
    };
    
    // Create safe copies of messages with explicit format for Claude API
    try {
      // We need to create a clean copy of messages to avoid reference issues
      const cleanMessages = messages.map(message => {
        // For string content messages, just return a clean copy
        if (typeof message.content === 'string') {
          return {
            role: message.role,
            content: message.content
          };
        }
        
        // Handle multimodal content arrays
        if (Array.isArray(message.content)) {
          console.log(`Processing multimodal message with ${message.content.length} content items`);
          
          // Create a clean content array
          const cleanContent = [];
          
          // Process each content item
          for (let i = 0; i < message.content.length; i++) {
            const item = message.content[i];
            
            // Handle text content
            if (item.type === 'text') {
              cleanContent.push({
                type: 'text' as const,  // Use const assertion for TypeScript
                text: String(item.text || '') // Ensure text is a string
              });
              continue;
            }
            
            // Handle image content with special care
            if (item.type === 'image' && item.source) {
              // Log image details for debugging
              console.log(`Processing image at index ${i}:`, {
                sourceType: item.source.type || 'unknown',
                mediaType: item.source.media_type || 'unknown',
                hasData: !!item.source.data,
                dataLength: item.source.data ? item.source.data.length : 0
              });
              
              // Skip images with missing data
              if (!item.source.data || typeof item.source.data !== 'string' || item.source.data.trim() === '') {
                console.error(`Skipping image at index ${i} due to missing or invalid data`);
                continue; // Skip this item instead of failing the whole request
              }
              
              // Create a clean image content object with explicit string conversion
              cleanContent.push({
                type: 'image' as const,  // Use const assertion for TypeScript
                source: {
                  type: 'base64' as const,  // Use const assertion for TypeScript
                  media_type: String(item.source.media_type || 'image/png'),
                  data: String(item.source.data) // Explicitly convert to string
                }
              });
              
              console.log(`Successfully processed image at index ${i}`);
            }
          }
          
          // If we have no content after cleaning, use a fallback message
          if (cleanContent.length === 0) {
            return {
              role: message.role,
              content: "I tried to send an image but there was an issue with the image data. Could you help me with text only?"
            };
          }
          
          return {
            role: message.role,
            content: cleanContent
          };
        }
        
        // Fallback for unknown content types
        return {
          role: message.role,
          content: "[Content format not supported]"
        };
      });
      
      // Now pass the clean messages to Claude API
      console.log('Sending cleaned messages to Claude API');
      const result = await streamText(cleanMessages, context.cloudflare.env, options);
      stream.switchSource(result.toAIStream());
    } catch (validationError) {
      console.error('Message processing error:', validationError);
      throw validationError; // Re-throw to be caught by the outer try/catch
    }
    
    return new Response(stream.readable, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
    
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    // Extract more useful error details
    let errorMessage = 'Failed to process chat request';
    let errorDetails = null;
    
    if (error instanceof Error) {
      errorMessage = error.message;
      // Check for Claude API-specific error format
      if (error.cause && typeof error.cause === 'object') {
        errorDetails = error.cause;
        console.error('API Error details:', JSON.stringify(errorDetails, null, 2));
      }
    } else if (typeof error === 'object' && error !== null) {
      // Try to extract more information from unknown error types
      errorDetails = error;
      try {
        console.error('Error details:', JSON.stringify(error, null, 2));
      } catch (e) {
        console.error('Error cannot be stringified:', error);
      }
    }
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: errorDetails,
      time: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
