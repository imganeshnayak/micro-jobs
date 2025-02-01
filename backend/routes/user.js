// import express from 'express';
// import User from '../models/User.js';

// const router = express.Router();

// // Get user details by ID
// // router.get("/:userId", async (req, res) => {
// //   try {
// //     const { userId } = req.params;

// //     // Find the user by ID
// //     const user = await User.findById(userId);
// //     if (!user) {
// //       return res.status(404).json({ error: "User not found" });
// //     }
// //     // Return user details (excluding sensitive information like passwords)
// //     const userDetails = {
// //       _id: user._id,
// //       name: user.name,
// //       email: user.email,
// //       phone: user.phone,
// //       address: user.address,
// //       pincode: user.pincode,
// //       profilePicture: user.profilePicture,
// //       ratings: user.ratings,
// //     };

// //     res.status(200).json(userDetails);
// //   } catch (error) {
// //     console.error("Error fetching user details:", error);
// //     res.status(500).json({ error: "Failed to fetch user details" });
// //   }
// // });


// // Get user details by ID
// router.get("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Find user in the database
//     const user = await User.findById(userId); // Use Mongoose's `findById` method

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     res.status(500).json({ error: "Failed to fetch user details" });
//   }
// });

// router.put("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { phone, address, pincode, profilePicture } = req.body;

//     // Find the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Update user details
//     user.phone = phone || user.phone;
//     user.address = address || user.address;
//     user.pincode = pincode || user.pincode;
//     user.profilePicture = profilePicture || user.profilePicture;

//     // Save the updated user
//     await user.save();

//     res.status(200).json({ message: "User details updated successfully", user });
//   } catch (error) {
//     console.error("Error updating user details:", error);
//     res.status(500).json({ error: "Failed to update user details" });
//   }
// });
// router.post("/:userId/rate", async (req, res) => {
//   try {
//     const { userId } = req.params; // ID of the user being rated
//     const { rating, raterId } = req.body; // ID of the user giving the rating and the rating value

//     // Validate rating (1 to 5)
//     if (rating < 1 || rating > 5) {
//       return res.status(400).json({ error: "Rating must be between 1 and 5" });
//     }

//     // Ensure the rater is not rating themselves
//     if (userId === raterId) {
//       return res.status(400).json({ error: "You cannot rate yourself" });
//     }

//     // Find the user being rated
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Add the rating to the user's ratings array
//     user.ratings.push({ userId: raterId, rating });
//     await user.save();

//     res.status(200).json({ message: "Rating submitted successfully" });
//   } catch (error) {
//     console.error("Error submitting rating:", error);
//     res.status(500).json({ error: "Failed to submit rating" });
//   }
// });

// export default router;


import express from "express";
import multer from "multer";
import path from "path";
import User from "../models/User.js";

const router = express.Router();

// 🛠 Multer Configuration for Profile Picture Upload
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});
const upload = multer({ storage });

// ✅ GET User Details by ID
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});

// ✅ UPDATE User Details (Including Profile Picture)
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { phone, address, pincode, profilePicture,upiId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update user details
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.pincode = pincode || user.pincode;
    user.profilePicture = profilePicture || user.profilePicture;
    user.upiId = upiId || user.upiId;

    await user.save();
    res.status(200).json({ message: "User details updated successfully", user });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Failed to update user details" });
  }
});

// ✅ UPLOAD Profile Picture
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// ✅ RATE a User
router.post("/:userId/rate", async (req, res) => {
  try {
    const { userId } = req.params; // User being rated
    const { rating, raterId } = req.body; // Rater's ID & rating value

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    if (userId === raterId) {
      return res.status(400).json({ error: "You cannot rate yourself" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if the rater has already rated this user
    const existingRating = user.ratings.find(r => r.userId.toString() === raterId);
    if (existingRating) {
      existingRating.rating = rating; // Update existing rating
    } else {
      user.ratings.push({ userId: raterId, rating }); // Add new rating
    }

    await user.save();
    res.status(200).json({ message: "Rating submitted successfully", ratings: user.ratings });
  } catch (error) {
    console.error("Error submitting rating:", error);
    res.status(500).json({ error: "Failed to submit rating" });
  }
});

export default router;
