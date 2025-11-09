const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "f09475fb-daba-44a3-9987-a31cb63504db";
const API = "https://api.cricapi.com/v1";

// ✅ Utility function
async function apiGet(path, params = {}) {
  const url = new URL(API + path);
  url.searchParams.set("apikey", API_KEY);

  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url);
  return res.json();
}

// ✅ 1. Get Current Matches
app.get("/matches", async (req, res) => {
  try {
    const data = await apiGet("/currentMatches");
    res.json(data.data || []);
  } catch (e) {
    res.status(500).json({ error: "Failed to load matches" });
  }
});

// ✅ 2. Get Match Info
app.get("/match/:id", async (req, res) => {
  try {
    const data = await apiGet("/match_info", { id: req.params.id });
    res.json(data.data || null);
  } catch (e) {
    res.status(500).json({ error: "Failed to load match info" });
  }
});

// ✅ 3. Search Players
app.get("/search", async (req, res) => {
  try {
    const { name } = req.query;
    const data = await apiGet("/players", { search: name });
    res.json(data.data || []);
  } catch (e) {
    res.status(500).json({ error: "Search failed" });
  }
});

// ✅ 4. Player Info
app.get("/player/:id", async (req, res) => {
  try {
    const data = await apiGet("/players_info", { id: req.params.id });
    res.json(data.data || null);
  } catch (e) {
    res.status(500).json({ error: "Failed to load player info" });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
