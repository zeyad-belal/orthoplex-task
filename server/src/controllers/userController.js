import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

// registration
const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password)
    return next(new AppError("email and password required", 401));

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    newUser.password = undefined;

    const user = await User.findOne({ email });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.send({ message: "user created successfully", newUser, token });
  } catch (error) {
    // Check for duplicate email error
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.email === 1
    ) {
      return next(new AppError("Email is already registered", 400));
    }
  }
};

const login = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;
  if (!email || !password)
    return next(new AppError("email and password are required", 401));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new AppError("user not found", 404));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError("invalid credentials", 401));

  let token;

  // Calculate the expiration time in seconds based on rememberMe
  const expirationInSeconds = rememberMe ? 365 * 24 * 60 * 60 : 60 * 60; // 1 year or 1 hour

  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: expirationInSeconds,
  });

  user.password = undefined;

  res.send({ user, token });
};

//get all users
const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

//get user by id
const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) return next(new AppError("user not found", 404));
  res.send({ user });
};

// update user info
const updateUser = async (req, res, next) => {
  const { id } = req.user;
  const { firstName, lastName, email } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { firstName, lastName, email },
    { new: true }
  );

  res.send({ user });
};

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  res.send({ user });
};

export { signUp, getUserById, getAllUsers, updateUser, deleteUser, login };
