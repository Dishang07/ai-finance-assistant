const express = require("express");
const cors = require("cors");
const investmentRoutes = require("./routes/investment");

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/investment", investmentRoutes);

module.exports = app;
