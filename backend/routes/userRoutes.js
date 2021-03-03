import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

//CREATE user profile, POST /, PUBLIC access
router.post("/", registerUser);

//GET ALL users, /users, protected admin,
router.get("/", protect, isAdmin, getUsers);

//AUTHORIZE user AND GET token, POST /users/login, public access
router.post("/login", authUser);

//get user profile, GET /users/profile, PRIVATE access
router.get("/profile", protect, getUserProfile); //middleware protect check

//Update profile, PUT /users/profile, PRIVATE ACCESS- need to be logged in
router.put("/profile", protect, updateUserProfile);

//DELETE user, DELETE /users/:id, PRIVATE admin
router.delete("/:id", protect, isAdmin, deleteUser);

//GET user by id, GET "/users/:id/", private admin
router.get("/:id", protect, isAdmin, getUserById);

//Update user, PUT /users/:id, private admin
router.put("/:id", protect, isAdmin, updateUser);
export default router;
