import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

// Allow streaming responses up to 15 seconds
export const maxDuration = 15;

export async function POST(req) {
  const { messages } = await req.json();

  // Define your basic information or context here
  const systemMessage = {
    role: 'system',
    content: 'You are a helpful language learning assistant.'
  };

  // Combine the system message with the user messages
  const allMessages = [
    systemMessage,
    ...convertToCoreMessages(messages),
  ];

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: allMessages, // Use the combined messages
  });

  return result.toDataStreamResponse();
}