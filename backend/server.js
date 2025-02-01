
// // import express from 'express';
// // import bodyParser from 'body-parser';
// // import cors from 'cors';
// // import mongoose from 'mongoose';
// // import http from 'http';
// // import { Server } from 'socket.io';
// // import dotenv from 'dotenv';
// // import rateLimit from 'express-rate-limit';
// // import winston from 'winston';
// // import authRoutes from './routes/auth.js';
// // import jobRoutes from './routes/jobs.js';
// // import searchRoutes from './routes/search.js';
// // import chatRoutes from './routes/chat.js';
// // import notificationsRoutes from './routes/notifications.js';
// // import userRoutes from './routes/user.js'; // Corrected import
// // import Chat from './models/Chat.js';
// // import User from './models/User.js'; // Import User model
// // import adminRoutes from './routes/adminRoutes.js';
// //  import serviceRoutes from './routes/service.js'; // Import serviceRoutes
// // dotenv.config();

// // const app = express();
// // const server = http.createServer(app);
// // const io = new Server(server, {
// //   cors: {
// //     origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
// //     methods: ['GET', 'POST'],
// //     credentials: true,
// //   },
// // });

// // // Logger
// // const logger = winston.createLogger({
// //   level: 'info',
// //   format: winston.format.json(),
// //   transports: [
// //     new winston.transports.Console(),
// //     new winston.transports.File({ filename: 'error.log', level: 'error' }),
// //     new winston.transports.File({ filename: 'combined.log' }),
// //   ],
// // });

// // // Rate limiting
// // const limiter = rateLimit({
// //   windowMs: 15 * 60 * 1000, // 15 minutes
// //   max: 100, // Limit each IP to 100 requests per windowMs
// // });
// // app.use(limiter);

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use(express.json());

// // // Socket.IO
// // io.on('connection', (socket) => {
// //   logger.info(`User connected: ${socket.id}`);

// //   socket.on('joinRoom', (chatRoomId) => {
// //     socket.join(chatRoomId);
// //     logger.info(`User ${socket.id} joined room ${chatRoomId}`);
// //   });

// //   socket.on('sendMessage', async (messageData) => {
// //     try {
// //       const newMessage = new Chat(messageData);
// //       await newMessage.save();
// //       io.to(messageData.chatRoomId).emit('receiveMessage', newMessage);
// //     } catch (error) {
// //       logger.error('Error saving or broadcasting message:', error);
// //     }
// //   });

// //   socket.on('disconnect', () => {
// //     logger.info(`User disconnected: ${socket.id}`);
// //   });
// // });

// // // MongoDB
// // mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => logger.info('MongoDB connected'))
// //   .catch(err => logger.error('MongoDB connection error:', err));

// // // Routes
// // app.use('/', authRoutes);
// // app.use('/jobs', jobRoutes);
// // app.use('/search', searchRoutes);
// // app.use('/chat', chatRoutes);
// // app.use('/notifications', notificationsRoutes);
// // app.use('/user', userRoutes);
// // app.use('/admin', adminRoutes);
// // app.use('/services', serviceRoutes); // Corrected route

// // // Health check
// // app.get('/health', (req, res) => {
// //   res.status(200).json({ status: 'OK' });
// // });

// // // Error handling
// // app.use((err, req, res, next) => {
// //   logger.error(err.stack);
// //   res.status(500).json({ message: 'Something went wrong!', error: err.message });
// // });

// // export { io }; // Export io for use in other modules

// // // Start server
// // const PORT = process.env.PORT || 5000;
// // server.listen(PORT, () => {
// //   logger.info(`Server is running on port ${PORT}`);
// // });




// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import mongoose from "mongoose";
// import http from "http";
// import { Server } from "socket.io";
// import dotenv from "dotenv";
// import rateLimit from "express-rate-limit";
// import winston from "winston";
// import authRoutes from "./routes/auth.js";
// import jobRoutes from "./routes/jobs.js";
// import searchRoutes from "./routes/search.js";
// import chatRoutes from "./routes/chat.js";
// import notificationsRoutes from "./routes/notifications.js";
// import userRoutes from "./routes/user.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import serviceRoutes from "./routes/service.js";
// import Chat from "./models/Chat.js";
// import User from "./models/User.js";
// import uploadRoutes from "./routes/upload.js"; // Import the upload route


// dotenv.config();
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: process.env.CORS_ORIGIN || "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // 🛠 Logger Configuration
// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.json(),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: "error.log", level: "error" }),
//     new winston.transports.File({ filename: "combined.log" }),
//   ],
// });

// // 🛠 Rate Limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });
// app.use(limiter);

// // 🛠 Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());
// app.use("/uploads", express.static("uploads")); // Serve images

// // 🛠 Socket.IO Setup
// io.on("connection", (socket) => {
//   logger.info(`User connected: ${socket.id}`);

//   socket.on("joinRoom", (chatRoomId) => {
//     socket.join(chatRoomId);
//     logger.info(`User ${socket.id} joined room ${chatRoomId}`);
//   });

//   socket.on("sendMessage", async (messageData) => {
//     try {
//       const newMessage = new Chat(messageData);
//       await newMessage.save();
//       io.to(messageData.chatRoomId).emit("receiveMessage", newMessage);
//     } catch (error) {
//       logger.error("Error saving or broadcasting message:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     logger.info(`User disconnected: ${socket.id}`);
//   });
// });

// // 🛠 MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => logger.info("MongoDB connected"))
//   .catch((err) => logger.error("MongoDB connection error:", err));

// // 🛠 Routes
// app.use("/", authRoutes);
// app.use("/jobs", jobRoutes);
// app.use("/search", searchRoutes);
// app.use("/chat", chatRoutes);
// app.use("/notifications", notificationsRoutes);
// app.use("/user", userRoutes);
// app.use("/admin", adminRoutes);
// app.use("/services", serviceRoutes);
// app.use("/upload", uploadRoutes); // Add the upload route

// // 🛠 Health Check
// app.get("/health", (req, res) => res.status(200).json({ status: "OK" }));

// // 🛠 Error Handling
// app.use((err, req, res, next) => {
//   logger.error(err.stack);
//   res.status(500).json({ message: "Something went wrong!", error: err.message });
// });

// export { io };

// // 🛠 Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));


import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";
import searchRoutes from "./routes/search.js";
import chatRoutes from "./routes/chat.js";
import notificationsRoutes from "./routes/notifications.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/adminRoutes.js";
import serviceRoutes from "./routes/service.js";
import uploadRoutes from "./routes/upload.js";

// Models
import Chat from "./models/Chat.js";
import User from "./models/User.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// ES6 workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Configure rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// server.js
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Socket.IO event handlers
io.on("connection", (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on("joinRoom", (chatRoomId) => {
    socket.join(chatRoomId);
    logger.info(`User ${socket.id} joined room ${chatRoomId}`);
  });

  socket.on("sendMessage", async (messageData) => {
    try {
      const newMessage = new Chat(messageData);
      await newMessage.save();
      io.to(messageData.chatRoomId).emit("receiveMessage", newMessage);
    } catch (error) {
      logger.error("Error saving or broadcasting message:", error);
    }
  });

  socket.on("disconnect", () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info("MongoDB connected"))
  .catch((err) => logger.error("MongoDB connection error:", err));

// Routes
app.use("/", authRoutes);
app.use("/jobs", jobRoutes);
app.use("/search", searchRoutes);
app.use("/chat", chatRoutes);
app.use("/notifications", notificationsRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/services", serviceRoutes);
app.use("/upload", uploadRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Export Socket.IO instance for use in other modules
export { io };

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});