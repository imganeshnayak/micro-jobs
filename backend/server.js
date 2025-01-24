import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import searchRoutes from './routes/search.js';
import chatRoutes from './routes/chat.js'; // Import chat routes
import notificationsRoutes from './routes/notifications.js'; // Import notifications routes


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ['GET', 'POST'], // Allow specific methods
    credentials: true // Allow credentials if needed
  }
});
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

// Socket.io connection
// io.on('connection', (socket) => {
//   console.log('A user connected');


//   // socket.on('fetchMessages', async (chatRoomId) => {
//   //   try {
//   //     const messages = await messages.find({ chatRoomId }).sort({ timestamp: 1 });
//   //     socket.emit('chatHistory', messages); // Send chat history to the client
//   //   } catch (error) {
//   //     console.error('Error fetching messages:', error);
//   //   }
//   // });
//   // socket.on('sendMessage', async (messageData) => {
//   //   try {
//   //     const newMessage = new Message(messageData);
//   //     await newMessage.save(); // Save the message to the database

//   //     io.emit('receiveMessage', newMessage); // Broadcast the message
//   //   } catch (error) {
//   //     console.error('Error saving message:', error);
//   //   }
//   // });
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// Connect to MongoDB (replace 'your_database_name' with your actual database name)
mongoose.connect('mongodb://localhost:27017/ganesh?tls=false', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/search', searchRoutes);
app.use('/chat', chatRoutes); // Ensure this line is present
app.use('/notifications', notificationsRoutes); // Add this line
export { io }; // Add this line to export io

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: err.message 
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});