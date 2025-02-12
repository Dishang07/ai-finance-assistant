const express = require("express");
const { getInvestmentAdvice } = require("../controllers/investmentController");

const router = express.Router();

router.post("/advice", getInvestmentAdvice);

module.exports = router;
