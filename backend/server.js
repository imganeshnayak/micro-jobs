import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http'; // Import http module for socket.io
import { Server as SocketServer } from "socket.io"; // ✅ Correct for ES modules
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js'; // Already in your server.js
import searchRoutes from './routes/Search.js';
import chatRoutes from './routes/chat.js'; // Import chat routes

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app); // Create HTTP server to attach socket.io
const io = new SocketServer(server, {
  cors: {
    origin: "*", // Adjust origin to match your frontend URL in production
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ganesh?tls=false', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/', authRoutes);
app.use('/jobs', jobRoutes); // This line is correct; no need to change it
app.use('/search', searchRoutes);
app.use('/chat', chatRoutes); // Use the chat routes in the server

// Handle socket.io events for chat
let users = {}; // To store connected users by their userId

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Save user socket id by their userId
  socket.on('setUser', (userId) => {
    users[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
  });

  // When a message is sent, broadcast it to the recipient
  socket.on('sendMessage', (data) => {
    const { senderId, receiverId, message } = data;
    if (users[receiverId]) {
      io.to(users[receiverId]).emit('receiveMessage', {
        senderId,
        message,
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: err.message 
  });
});

// Start the server using `server.listen`
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
