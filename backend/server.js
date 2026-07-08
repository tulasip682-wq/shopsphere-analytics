require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }
});

connectDB();

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/orders", require("./routes/orders")(io));
app.use("/analytics", require("./routes/analytics"));


// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    service: "ShopSphere Analytics Backend"
  });
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ 
    success: true, 
    message: "Backend API is working",
    endpoints: {
      auth: "/auth/login",
      orders: "/orders",
      analytics: "/analytics",
      health: "/health"
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});