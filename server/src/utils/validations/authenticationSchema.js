import Joi from 'joi';
import AppError from '../AppError.js';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  rememberMe: Joi.boolean(),
});

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  first_name: Joi.string().min(3).max(20).required(),
  last_name: Joi.string().min(3).max(20).required(),
  phone_number: Joi.string(),
});

const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(new AppError(error, 401));
  next();
};

const signupValidation = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return next(new AppError(error, 401));
  next();
};

module.exports = { loginValidation, signupValidation };
