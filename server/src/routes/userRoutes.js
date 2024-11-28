import { router } from "express"

const {
  signUp,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/userController");

const {
  loginValidation,
  signupValidation
} = require("../utils/validations/authenticationSchema");
const verfiyUserToken = require("../middlewares/verfiyUserToken"); 


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
router.delete("/:id", deleteUser);

module.exports = router;
