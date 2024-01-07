import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authenticateToken = async (req, res, next) => {
  const tokenHeader = req.header("Authorization");

  console.log("tokenHeader", tokenHeader);

  if (!tokenHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Extract the token from the header (remove "Bearer " if present)
  const token = tokenHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //

    // console.log("decoded", decoded);

    req.user = decoded;

    // Check if the user exists in the collection
    const user = await User.findById(decoded.userId);
    //
    // console.log("user", user);

    if (!user) {
      console.error("User not found");
      return res.status(403).json({ message: "Forbidden: Invalid user" });
    }

    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

export { authenticateToken };
