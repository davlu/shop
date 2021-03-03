import express from "express";
import {
  addOrderItems,
  getOrderByID,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

//POST new order
router.post("/", protect, addOrderItems);

//GET all orders
router.get("/", protect, isAdmin, getAllOrders);

//GET my orders
router.get("/myorders", protect, getMyOrders);

//GET order by ID
router.get("/:id", protect, getOrderByID); //make sure this is at the bottom of /

//UPDATE order to paid=true
router.put("/:id/pay", protect, updateOrderToPaid);

//UPDATE order to delievered=true
router.put("/:id/deliver", protect, isAdmin, updateOrderToDelivered);

export default router;
