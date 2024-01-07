// routes/cartRoutes.js
import { Router } from "express";
const router = Router();
import CartController from "../controllers/cartController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

// Define cart routes
router.post("/add-to-cart", authenticateToken, CartController.addToCart);
router.get("/get-cart", authenticateToken, CartController.getCart);
router.post(
  "/remove-from-cart",
  authenticateToken,
  CartController.removeFromCart
);

export { router as cartRoutes };
