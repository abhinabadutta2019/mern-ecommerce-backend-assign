// controllers/productController.js
import Product from "../models/Product.js";
import multer from "multer";
import path from "path";

//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Set unique filename based on timestamp
  },
});
//
const upload = multer({ storage: storage });
//

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error getting products:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error("Error getting product by ID:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { name, description, price } = req.body;

      console.log(req.body, "req.body");

      // Check if an image file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: "Please upload an image." });
      }

      // Create a new product
      const newProduct = new Product({
        name,
        description,
        price,
        imagePath: req.file.path, // Save the local path to the image
      });

      // Save the product to the database
      await newProduct.save();

      res.status(201).json({ message: "Product created successfully." });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
};

export default ProductController;
