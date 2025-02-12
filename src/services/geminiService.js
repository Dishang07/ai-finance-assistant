const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

async function fetchInvestmentAdvice(amount, period, riskTolerance) {
    const prompt = `A user wants to invest ₹${amount} for ${period} months with a ${riskTolerance} risk tolerance.
    Suggest investment options such as:
    - Stock Market (ETFs, Mutual Funds, Direct Stocks)
    - Bonds
    - Real Estate
    - Gold/Silver
    - Cryptocurrency
    - Fixed Deposits
    Mention risks, returns, and benefits.

    Additionally, analyze and **recommend the single best investment option** for the user based on:
    - Risk tolerance
    - Investment period
    - Growth potential
    - Stability`;


    try {
        console.log("📡 Sending request to Gemini API...");
        console.log("🔹 Request Payload:", JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        }, null, 2));

        const response = await axios.post(GEMINI_API_URL, {
            contents: [{ parts: [{ text: prompt }] }]
        });

        console.log("✅ Gemini API Response:", response.data);

        if (response.data.candidates && response.data.candidates.length > 0) {
            return response.data.candidates[0].content.parts[0].text;
        } else {
            throw new Error("Unexpected Gemini API response format.");
        }
    } catch (error) {
        console.error("❌ Gemini API Error:", error.response ? error.response.data : error.message);
        throw new Error("Error fetching investment advice.");
    }
}

module.exports = { fetchInvestmentAdvice };
