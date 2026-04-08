const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// API KEY
const API_KEY = "demo_teddyeld_12345";

app.use(express.json());

// 👉 PUBLIC DOCS
app.get('/docs', (req, res) => {
  res.json({
    service: "Teddy ELD API",
    base_url: "https://teddy-eld-api.onrender.com",
    authentication: "Bearer token required",
    demo_token: "demo_teddyeld_12345",
    endpoints: [
      "GET /health",
      "GET /vehicles",
      "GET /drivers",
      "GET /hos"
    ]
  });
});

// 👉 HEALTH CHECK 
app.get('/health', (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

// 👉 AUTH 
app.use((req, res, next) => {
  const auth = req.headers['authorization'];

  if (auth === `Bearer ${API_KEY}`) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// 👉 VEHICLES
app.get('/vehicles', (req, res) => {
  res.json([
    {
      vehicle_id: "TRUCK_001",
      lat: 40.7128,
      lon: -74.0060,
      speed: 60,
      timestamp: new Date().toISOString()
    },
    {
      vehicle_id: "TRUCK_002",
      lat: 34.0522,
      lon: -118.2437,
      speed: 55,
      timestamp: new Date().toISOString()
    }
  ]);
});

// 👉 DRIVERS
app.get('/drivers', (req, res) => {
  res.json([
    {
      driver_id: "DRIVER_001",
      name: "John Doe",
      status: "active",
      vehicle_id: "TRUCK_001"
    }
  ]);
});

// 👉 HOS
app.get('/hos', (req, res) => {
  res.json([
    {
      driver_id: "DRIVER_001",
      drive_time_remaining: 6,
      shift_time_remaining: 9,
      cycle_remaining: 40,
      status: "driving",
      timestamp: new Date().toISOString()
    }
  ]);
});

// 👉 START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});