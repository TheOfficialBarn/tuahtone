import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req) {
  const { prompt } = await req.json();

  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    system: 'You are a helpful assistant.',
    prompt,
  });

  return Response.json({ text });
}