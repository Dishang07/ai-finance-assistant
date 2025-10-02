require("dotenv").config();
const express = require("express");

const path = require("path");
const app = require("./src/app");

const PORT = process.env.PORT || 5000;


// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, "frontend")));

// Serve index.html for root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Fallback: serve index.html for any unknown route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
