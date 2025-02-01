
 
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },

  // Additional fields for user details
  phone: { type: String, required: false, match: /^\d{10}$/ }, // 10-digit phone number
  address: { type: String, required: false }, // User's address
  pincode: { type: String, required: false, match: /^\d{6}$/ }, // 6-digit pincode
  profilePicture: { type: String, default: "" }, // URL of the profile picture
  upiId:{type:String,default:""},
  // Ratings given by other users
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ID of the user who gave the rating
      rating: { type: Number, required: true, min: 1, max: 5 }, // Rating value (1 to 5)
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;