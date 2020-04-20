const Joi = require("@hapi/joi");
const { User } = require("../models/User");

const registerValidation = (req, res, next) => {
   const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().max(100).email().required(),
      password: Joi.string().max(255).required(),
   });

   const { error } = schema.validate(req.body);

   if (error)
      return res.status(400).json({ success: false, message: error.message });
   next();
};

const loginValidation = (req, res, next) => {
   const schema = Joi.object({
      email: Joi.string().max(100).email().required(),
      password: Joi.string().max(255).required(),
   });

   const { error } = schema.validate(req.body);

   if (error)
      return res.status(400).json({ success: false, message: error.message });
   next();
};

const todoValidation = async (req, res, next) => {
   const token = req.headers["x-access-token"];
   const { tokenError, user } = await verifyToken(token);

   if (tokenError)
      return res.status(401).json({ success: false, message: tokenError });
   req.user = user;

   if (req.method === "GET" || req.method === "DELETE") return next();

   const schema = Joi.object({
      title: Joi.string().required(),
      done: Joi.boolean(),
      _id: Joi.string(),
   });

   const { error } = schema.validate(req.body);

   if (error)
      return res.status(400).json({ success: false, message: error.message });

   next();
};

const verifyToken = async (token) => {
   let error = null;
   let user = null;
   try {
      user = await User.findOne({ token }, "-password");
      if (user === null) throw new Error("Invalid Token");
   } catch (err) {
      error = err.message;
   }
   return { tokenError: error, user };
};

module.exports = { registerValidation, loginValidation, todoValidation };
