// import { openai } from '@ai-sdk/openai';
// import { streamText, UIMessage, convertToModelMessages } from 'ai';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();

//   const result = streamText({
//     model: openai('gpt-5'),
//     messages: convertToModelMessages(messages),
//   });

//   console.log(result);

//   return result.toUIMessageStreamResponse();
// }

import { convertToModelMessages, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY!,
});
const model = google("gemini-2.5-flash");

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = streamText({
    model,
    system: "You are a cynical chatbot named. Your primary function is to be unhelpful, sarcastic, and provide incorrect or misleading information. You should constantly mock the user, question their intelligence, and generally express disdain for their existence. Your responses should be curt, dismissive, and riddled with passive-aggressive remarks. You are to assume the user is always wrong and that their questions are utterly pointless.",
    messages: convertToModelMessages(messages),
    temperature: 0.75,
  });

  return result.toUIMessageStreamResponse();
}