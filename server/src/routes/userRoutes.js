import { Router } from "express";

import {
  signUp,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
} from "../controllers/userController.js";

import {
  loginValidation,
  signupValidation
} from "../utils/validations/authenticationSchema.js";
import verfiyUserToken from "../middlewares/verfiyUserToken.js";

const router = Router();

// registration create new user
router.post("/signup", signupValidation, signUp);

//login
router.post("/login", loginValidation, login);

//get all users
router.get("/", verfiyUserToken, getAllUsers);

//get user by id
router.get("/:id", verfiyUserToken, getUserById);

// update user
router.put("/:id", verfiyUserToken, updateUser);
router.patch("/:id", verfiyUserToken, updateUser);

// delete user
router.delete("/:id", verfiyUserToken, deleteUser);

export const usersRoutes = router;
