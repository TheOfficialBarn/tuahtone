import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST() {
  const prompt = 'Hi give me a random number'

  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    system: 'You are a helpful assistant.',
    prompt,
  });
  console.log(text)
  return text;
}