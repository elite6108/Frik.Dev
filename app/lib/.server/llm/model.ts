import { createAnthropic } from '@ai-sdk/anthropic';

// Store the client as a singleton
let anthropicClient: ReturnType<typeof createAnthropic>;

/**
 * Creates an Anthropic client with proper error handling
 */
export function getAnthropicModel(apiKey: string) {
  // Validate API key
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not set in environment');
    throw new Error('Missing Anthropic API key');
  }
  
  try {
    // Create the Anthropic client
    console.log('Initializing Anthropic client for Claude 3.5 Sonnet');
    
    // Only create a new client if we don't have one already
    if (!anthropicClient) {
      anthropicClient = createAnthropic({
        apiKey,
      });
      console.log('Anthropic client created successfully');
    }
    
    // Make sure we're using a model that supports multimodal content
    // Claude 3.5 Sonnet supports image inputs
    console.log('Using model: claude-3-5-sonnet-20240620');
    return anthropicClient('claude-3-5-sonnet-20240620');
  } catch (error) {
    console.error('Failed to initialize Anthropic client:', error);
    throw new Error('Failed to initialize Anthropic client');
  }
}
