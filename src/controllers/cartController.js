// controllers/cartController.js
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const CartController = {
  addToCart: async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.user.userId; // Assuming you have middleware to extract userId from JWT

      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      // Check if the user already has a cart
      let cart = await Cart.findOne({ userId });

      // If the user doesn't have a cart, create one
      if (!cart) {
        cart = new Cart({
          userId,
          products: [{ productId, quantity: 1 }],
        });
      } else {
        // If the user has a cart, increase the quantity or add a new product
        const existingProductIndex = cart.products.findIndex(
          (item) => item.productId.toString() === productId
        );

        if (existingProductIndex !== -1) {
          cart.products[existingProductIndex].quantity += 1;
        } else {
          cart.products.push({ productId, quantity: 1 });
        }
      }

      // Save the updated cart to the database
      await cart.save();

      res
        .status(200)
        .json({ message: "Product added to the cart successfully." });
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  getCart: async (req, res) => {
    try {
      const userId = req.user.userId; // Assuming you have middleware to extract userId from JWT

      let cart = await Cart.findOne({ userId }).populate("products.productId");

      // If cart not found, create an empty cart for the user
      if (!cart) {
        cart = new Cart({
          userId,
          products: [],
        });
        await cart.save();
      }

      // Calculate total value
      const totalValue = cart.products.reduce((total, item) => {
        const product = item.productId;
        return total + product.price * item.quantity;
      }, 0);

      // Include total value in the response
      const response = {
        cart,
        totalValue,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error getting cart:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.user.userId; // Assuming you have middleware to extract userId from JWT

      // Check if the user has a cart
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found." });
      }

      // Find the index of the specified product in the cart
      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      // If the product is not in the cart, return an error
      if (productIndex === -1) {
        return res
          .status(404)
          .json({ message: "Product not found in the cart." });
      }

      // Decrease the quantity of the specified product by 1
      cart.products[productIndex].quantity -= 1;

      // If the quantity becomes zero, remove the product from the cart
      if (cart.products[productIndex].quantity === 0) {
        cart.products.splice(productIndex, 1);
      }

      // Save the updated cart to the database
      await cart.save();

      res.status(200).json({ message: "One quantity removed from the cart." });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
};

export default CartController;
