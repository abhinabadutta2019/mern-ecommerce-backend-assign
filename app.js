// Import dependencies using ESM syntax
//
process.env.AWS_SUPPRESS_WARN = "1";
//
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // Import path module
//
import { userRoutes } from "./src/routes/userRoutes.js";
import { productRoutes } from "./src/routes/productRoutes.js";
// Load environment variables from a .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
//
// Use import.meta.url to get the current module's URL
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

///////mongoDB cloud//////////////////
let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.te788iv.mongodb.net/assign-ecom-jan-24?retryWrites=true&w=majority`;
//
async function connectToMongoDB() {
  try {
    //if mongoDB uri is correct
    //if it is connected
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    //if error in connection or - in mongoDB uri
    console.error("MongoDB connection error:", error);
  }
}
// Call the async function to connect to MongoDB
connectToMongoDB();

////////////////////////////////////////////

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, this is your MERN e-commerce backend!");
});
//
// Use user routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

//
const PORT = process.env.PORT || 3008;

app.listen(PORT, () => console.log(`server running at ${PORT}`));
//
