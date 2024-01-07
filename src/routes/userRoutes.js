// routes/userRoutes.js
import { Router } from "express";
const router = Router();
import UserController from "../controllers/userController.js";

// Define user routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

// export default router;
export { router as userRoutes };
