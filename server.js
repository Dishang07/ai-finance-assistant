require("dotenv").config();
const express = require("express");
const app = require("./src/app");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to the AI Finance Assistant API! Use /api/investment/advice for recommendations.");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
