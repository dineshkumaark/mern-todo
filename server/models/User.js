const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      maxlength: 30,
   },
   email: {
      type: String,
      trim: true,
   },
   password: String,
   token: String,
});

userSchema.methods.comparePassword = function (plainPassword) {
   return bcrypt.compareSync(plainPassword, this.password);
};

userSchema.methods.generateToken = function (cb) {
   var user = this;

   const JWTSECRECT = process.env.JWTSECRECT;
   user.token = "";

   const token = jwt.sign(user.toJSON(), JWTSECRECT);
   user.token = token;

   user.save((err, user) => {
      if (err) cb(err);
      cb(null, user);
   });
};

userSchema.statics.findByToken = async function (token, cb) {
   var user = this;

   const JWTSECRECT = process.env.JWTSECRECT;
   let decoded = jwt.verify(token, JWTSECRECT);

   User.findOne({ _id: decoded._id, token }, (err, decodedUser) => {
      if (err) return cb(err);
      cb(null, decodedUser);
   }).select("-password");
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
