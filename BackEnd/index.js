import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import bootstrap from "./src/app.js";

const app = express();

// 🔥 مهم: نلف Express بـ HTTP server
const server = http.createServer(app);

// 🔥 Socket.IO
const io = new Server(server, {
  cors: {
    origin: [
      "https://edu-plat-form.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST"]
  }
});

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // تسجيل اليوزر
  socket.on("register", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log("onlineUsers:", onlineUsers);
  });

  socket.on("disconnect", () => {
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    }
    console.log("User disconnected");
  });
});

// CORS
app.use(cors({
  origin: [
    "https://edu-plat-form.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

bootstrap(app, express);

const port = process.env.PORT || 3000;

server.listen(port, "0.0.0.0", () => {
  console.log("Server running on port", port);
});

export { io, onlineUsers , app };