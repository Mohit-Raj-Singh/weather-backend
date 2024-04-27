const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require('dotenv').config()

const API_KEY = process.env.API_KEY;

const app = express();
const port = 4500;

app.use(express.json());

app.use(cors()); // Enable CORS for all routes

// Define API route to fetch weather data
app.get("/weather/:city", async (req, res) => {
    const city = req.params.city;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

app.post("/current-weather", async (req, res) => {
    const { lattitude, longitude } = req.body;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
