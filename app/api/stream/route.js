import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req) {
  const { prompt } = await req.json();

  const { text } = await streamText({
    model: openai('gpt-4o-mini'),
    system: 'You are a helpful assistant.',
    prompt,
  });

  return Response.toDataStreamResponse(); //Response.json takes in an object as a parameter, thus we use brackets
}