// routes/productRoutes.js
import { Router } from "express";
const router = Router();
import ProductController from "../controllers/productController.js";
import path from "path";
import multer from "multer";
//
import { authenticateToken } from "../middleware/authenticateToken.js";

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

// Define product routes
router.get("/", authenticateToken, ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", upload.single("image"), ProductController.createProduct);

export { router as productRoutes };
