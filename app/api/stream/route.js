import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req) {
  const { prompt } = await req.json();
  console.log(prompt);
  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: 'Be straight to the point. Don\'t type anything extra or more than necessary.',
    prompt,
  });

  return result.toDataStreamResponse();
}