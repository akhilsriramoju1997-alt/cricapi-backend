const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "f09475fb-daba-44a3-9987-a31cb63504db";

// ✅ Player Search
app.get("/search", async (req, res) => {
  const { name } = req.query;

  const url = `https://api.cricapi.com/v1/players?apikey=${API_KEY}&search=${name}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.data || []);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

// ✅ Player Info
app.get("/player", async (req, res) => {
  const { id } = req.query;

  const url = `https://api.cricapi.com/v1/players_info?apikey=${API_KEY}&id=${id}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.data || null);
  } catch (err) {
    console.error("Player fetch error:", err);
    res.status(500).json({ error: "Failed to fetch player info" });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
