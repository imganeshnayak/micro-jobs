import express from "express";
import User from "../models/User.js";  // Note the .js extension
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Utility function for error responses
const sendErrorResponse = (res, status, message, error = null) => {
  console.error(message, error);
  res.status(status).json({ message, error });
};

// Register route
router.post('/register', async (req, res) => {
  const { fullName, email, password, userType } = req.body;

  if (!email || !password || !fullName || !userType) {
    return sendErrorResponse(res, 400, "All fields are required");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendErrorResponse(res, 400, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword, userType });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    sendErrorResponse(res, 500, 'Error registering user', error);
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendErrorResponse(res, 400, 'Email and password are required');
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, 400, 'Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: { _id: user._id, fullName: user.fullName, email: user.email, userType: user.userType }
    });
  } catch (error) {
    sendErrorResponse(res, 500, 'Error logging in', error);
  }
});

export default router;
