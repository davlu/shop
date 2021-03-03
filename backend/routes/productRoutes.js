import express from "express";
import {
  getProducts,
  getProductByID,
  getTopProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

//GET ALL PRODUCTS, /products, public route
router.get("/", getProducts);

//CREATE a default product, /products, PRIVATE ADMIN
router.post("/", protect, isAdmin, createProduct);

//GET TOP PRODUCTS, /top, public route
router.get("/top", getTopProducts);

//GET single product, /products/:id, public access
router.get("/:id", getProductByID);

//DELETE single product, /products/:id, PRIVATE ADMIN
router.delete("/:id", protect, isAdmin, deleteProduct);

//UPDATE single product by id, /products/:id, PRIVATE ADMIN
router.put("/:id", protect, isAdmin, updateProduct);

//CREATE PRODUCT REVIEW, /products/:id, private
router.post("/:id/reviews", protect, createProductReview);

export default router;
