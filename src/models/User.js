// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Add other fields as needed (e.g., name, address, etc.)
});

const User = mongoose.model("User", userSchema);

export default User;
