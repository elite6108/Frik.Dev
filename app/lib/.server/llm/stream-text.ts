import { streamText as _streamText, convertToCoreMessages } from 'ai';
import { getAPIKey } from '~/lib/.server/llm/api-key';
import { getAnthropicModel } from '~/lib/.server/llm/model';
import { MAX_TOKENS } from './constants';
import { getSystemPrompt } from './prompts';

interface ToolResult<Name extends string, Args, Result> {
  toolCallId: string;
  toolName: Name;
  args: Args;
  result: Result;
}

export interface ImageContent {
  type: 'image';
  source: {
    type: 'base64';
    media_type: string;
    data: string;
  };
}

export interface TextContent {
  type: 'text';
  text: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string | Array<TextContent | ImageContent>;
  toolInvocations?: ToolResult<string, unknown, unknown>[];
}

export type Messages = Message[];

export type StreamingOptions = Omit<Parameters<typeof _streamText>[0], 'model'>;

export function streamText(messages: Messages, env: Env, options?: StreamingOptions) {
  try {
    console.log('Processing messages for Claude API', messages.length);
    
    // Create a new array of messages with clean content
    const safeMessages: any[] = [];
    
    // Process each message separately
    for (const message of messages) {
      // Handle text-only messages (simple case)
      if (typeof message.content === 'string') {
        safeMessages.push({
          role: message.role,
          content: message.content,
        });
        continue;
      }
      
      // Handle multimodal messages (complex case)
      if (Array.isArray(message.content)) {
        console.log(`Processing multimodal message with ${message.content.length} content items`);
        
        // Process text and image content separately
        const textItems: {type: 'text', text: string}[] = [];
        const imageItems: {type: 'image', source: {type: 'base64', media_type: string, data: string}}[] = [];
        
        // First, extract all text items
        for (let i = 0; i < message.content.length; i++) {
          const item = message.content[i];
          if (item.type === 'text' && item.text) {
            textItems.push({
              type: 'text' as const,
              text: String(item.text)
            });
          }
        }
        
        // Then, handle image items with careful validation
        for (let i = 0; i < message.content.length; i++) {
          const item = message.content[i];
          if (item.type === 'image' && item.source) {
            try {
              // Complete validation of image data
              if (!item.source.data || typeof item.source.data !== 'string' || !item.source.data.trim()) {
                console.error(`Skipping invalid image at index ${i}: missing or invalid data`);
                continue;
              }
              
              if (!item.source.media_type || !item.source.media_type.startsWith('image/')) {
                console.error(`Skipping invalid image at index ${i}: invalid media type`);
                continue;
              }
              
              // Explicitly create a new string to avoid reference issues
              const cleanData = String(item.source.data);
              const mediaType = String(item.source.media_type);
              
              // Log data info but don't log the actual data (privacy/security)
              console.log(`Adding image: type=${mediaType}, data length=${cleanData.length}`);
              
              // Only add image if data is present and valid
              if (cleanData.length > 100) {
                imageItems.push({
                  type: 'image' as const,
                  source: {
                    type: 'base64' as const,
                    media_type: mediaType,
                    data: cleanData
                  }
                });
              } else {
                console.error(`Skipping image at index ${i}: data too short (${cleanData.length} chars)`);
              }
            } catch (error) {
              console.error(`Error processing image at index ${i}:`, error);
              // Skip this image but continue with others
            }
          }
        }
        
        // If we have text or images, create a clean multimodal message
        if (textItems.length > 0 || imageItems.length > 0) {
          const combinedContent = [...textItems, ...imageItems];
          console.log(`Adding multimodal message with ${textItems.length} text and ${imageItems.length} image items`);
          
          safeMessages.push({
            role: message.role,
            content: combinedContent
          });
        } else {
          // Fallback if no valid content
          console.log('No valid content in multimodal message, adding fallback text');
          safeMessages.push({
            role: message.role,
            content: "[Message contained invalid content]"
          });
        }
      } else {
        // Fallback for unknown content types
        console.log('Unknown message content type:', typeof message.content);
        safeMessages.push({
          role: message.role,
          content: "[Unknown message format]"
        });
      }
    }
    
    // Verify we have at least one message
    if (safeMessages.length === 0) {
      throw new Error('No valid messages to send to Claude API');
    }
    
    console.log(`Sending ${safeMessages.length} messages to Claude API`);
    
    // Get the API key and model
    const apiKey = getAPIKey(env);
    if (!apiKey) {
      throw new Error('Missing Anthropic API key');
    }
    
    // Send to Claude API with explicit formatting
    return _streamText({
      model: getAnthropicModel(apiKey),
      system: getSystemPrompt(),
      maxTokens: MAX_TOKENS,
      headers: {
        'anthropic-beta': 'max-tokens-3-5-sonnet-2024-07-15',
      },
      messages: safeMessages,
      ...options,
    });
  } catch (error) {
    console.error('Error in streamText:', error);
    throw error;
  }
}
