// scripts/test-openai.js
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.OPENAI_API_KEY;

console.log("--- OpenAI Connectivity Test ---");
console.log("Checking for API Key...");

if (!apiKey) {
    console.error("❌ ERROR: OPENAI_API_KEY is missing in .env.local");
    console.log("Please ensure you have a file named .env.local in the root directory.");
    console.log("Content should be: OPENAI_API_KEY=sk-...");
    process.exit(1);
}

console.log("✅ API Key found (starts with: " + apiKey.substring(0, 7) + "...)");
console.log("Attempting to call OpenAI API...");

async function testConnection() {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [{ role: "user", content: "Hello, are you working?" }],
                max_tokens: 10
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("❌ API Request Failed!");
            console.error("Status:", response.status);
            console.error("Error:", JSON.stringify(errorData, null, 2));
            return;
        }

        const data = await response.json();
        console.log("✅ Success! OpenAI responded:");
        console.log("Response:", data.choices[0].message.content);

    } catch (error) {
        console.error("❌ Network/System Error:", error.message);
    }
}

testConnection();
