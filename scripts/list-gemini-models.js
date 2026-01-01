// scripts/list-gemini-models.js
require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.error("❌ No API Key found in .env.local");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // Note: The Node SDK doesn't have a direct listModels method exposed easily on the main class in all versions,
        // but we can try a simple generation with a known model to see if it works, 
        // or just try 'gemini-pro' which is standard.

        // Actually, let's just try to generate with 'gemini-pro' to see if that works.
        console.log("Attempting to use 'gemini-pro'...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log("✅ 'gemini-pro' works!");
        console.log("Response:", result.response.text());

        console.log("\nAttempting to use 'gemini-1.5-flash'...");
        const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const resultFlash = await modelFlash.generateContent("Hello");
        console.log("✅ 'gemini-1.5-flash' works!");

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

listModels();
