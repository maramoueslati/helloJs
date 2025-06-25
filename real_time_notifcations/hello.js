const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // or specify your frontend domain
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json()); // to parse JSON POST body

// Store socket list if needed for targeting
io.on("connection", (socket) => {
  console.log("Android or Web Client connected:", socket.id);
});

// 🔥 POST endpoint to trigger a notification from Web App
app.post("/send-notification", (req, res) => {
  const { title, message } = req.body;
  console.log('📨 Received notification title', title) ;
  console.log('📨 Received notification message', message) ;

  if (!title || !message) {
    return res.status(400).json({ error: "Missing title or message" });
  }

  console.log("📨 Web App sent a notification:", title, message);

  // Broadcast to all connected clients
  io.emit("notification", { title, message });

  res.status(200).json({ success: true });
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
