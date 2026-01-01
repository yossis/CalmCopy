import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MOCK_DELAY = 1500;

const MOCK_RESPONSES = [
    "Here is a draft for your update: 'We are thrilled to announce our latest feature, designed to make your life easier. It is simple, intuitive, and built with you in mind.'",
    "How about this? 'Say hello to the future of insurance. Fast, affordable, and hassle-free. That is the Lemonade way.'",
    "Try this: 'We believe in transparency and trust. That is why we are changing the game, one policy at a time.'",
];

export async function POST(request: Request) {
    try {
        const { context, prompt, apiKey, mock } = await request.json();

        // 1. Handle Mock Mode
        if (mock) {
            await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
            const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
            return NextResponse.json({
                content: `[MOCK] ${randomResponse}\n\n(Context: ${context.segment}, ${context.tone}, ${context.audience})`,
            });
        }

        // 2. Handle Real Gemini Mode
        // Check GEMINI_API_KEY first, then fallback to OPENAI_API_KEY (for backward compat if user didn't rename env var)
        const finalApiKey = apiKey || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

        console.log("API Debug - Client Key:", apiKey ? "Provided" : "Missing");
        console.log("API Debug - Server Key (GEMINI):", process.env.GEMINI_API_KEY ? "Provided" : "Missing");
        console.log("API Debug - Final Key:", finalApiKey ? "Set" : "Missing");

        if (!finalApiKey) {
            return NextResponse.json({ error: "Missing API Key (Client or Server)" }, { status: 401 });
        }

        const systemPrompt = `
      You are a professional content strategist for Lemonade (the insurance company).
      Your tone is: ${context.tone}.
      Your audience is: ${context.audience}.
      Your goal is to write content for: ${context.segment}.
      
      Lemonade's brand voice is:
      - Friendly, human, and conversational.
      - Simple and direct (no jargon).
      - Playful but trustworthy.
      - Uses "We" and "You".
      
      Write a polished piece of content based on the user's request.
    `;

        const genAI = new GoogleGenerativeAI(finalApiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest",
            systemInstruction: systemPrompt
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ content: text });

    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error: " + (error.message || String(error)) }, { status: 500 });
    }
}
