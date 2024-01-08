// controllers/userController.js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserController = {
  registerUser: async (req, res) => {
    try {
      const { username, password, email } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists." });
      }

      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
      });

      // Save the user to the database
      await newUser.save();

      // Generate a JWT token for the registered user
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "10h",
      });

      // Return the token along with a success message
      res.status(201).json({ message: "User registered successfully.", token });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ username });

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Compare the entered password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If passwords match, generate and return a JWT token
      if (passwordMatch) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "10h",
        });
        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ message: "Invalid credentials." });
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
};

export default UserController;
