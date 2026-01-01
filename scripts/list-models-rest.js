// scripts/list-models-rest.js
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.error("❌ No API Key found");
    process.exit(1);
}

async function listModels() {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("❌ API Error:", JSON.stringify(data.error, null, 2));
            return;
        }

        console.log("✅ Available Models:");
        if (data.models) {
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name} (${m.displayName})`);
                }
            });
        } else {
            console.log("No models found in response.");
        }

    } catch (error) {
        console.error("❌ Network Error:", error.message);
    }
}

listModels();
