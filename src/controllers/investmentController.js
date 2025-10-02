const { fetchInvestmentAdvice } = require("../services/geminiService");

const getInvestmentAdvice = async (req, res) => {
    const { amount, period, riskTolerance } = req.body;

    if (!amount || !period || !riskTolerance) {
        return res.status(400).json({ error: "Please provide amount, period, and risk tolerance." });
    }

    try {
        const advice = await fetchInvestmentAdvice(amount, period, riskTolerance);
        res.json({ advice });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch investment advice" });
    }
};

module.exports = { getInvestmentAdvice };
