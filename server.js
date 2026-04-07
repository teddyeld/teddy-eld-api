const express = require('express');
const app = express();

const PORT = 3000;

// API KEY
const API_KEY = "demo_teddyeld_12345";

// Проверка ключа
app.use((req, res, next) => {
  const auth = req.headers['authorization'];

  if (auth === `Bearer ${API_KEY}`) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Endpoint
app.get('/vehicles', (req, res) => {
  res.json([
    {
      vehicle_id: "TRUCK_001",
      lat: 40.7128,
      lon: -74.0060,
      timestamp: new Date().toISOString()
    },
    {
      vehicle_id: "TRUCK_002",
      lat: 34.0522,
      lon: -118.2437,
      timestamp: new Date().toISOString()
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});