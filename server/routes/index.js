const express = require("express");
const Router = express.Router();
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");

Router.post("/register", (req, res, next) => {
   const hashedPass = bcrypt.hashSync(req.body.password);
   req.body.password = hashedPass;

   const user = new User(req.body);

   user.save((err, data) => {
      if (err) return res.send({ success: false, message: err });
      return res.status(200).json({ success: true, data });
   });
});

Router.post("/login", async (req, res, next) => {
   const { email, password } = req.body;
   try {
      const userExits = await User.findOne({ email });

      if (!userExits)
         return res
            .status(400)
            .json({ success: false, message: "Email Not Registered" });

      const isMatch = userExits.comparePassword(password);
      if (!isMatch)
         return res
            .status(400)
            .json({ success: false, message: "Invalid Password" });

      userExits.generateToken((err, user) => {
         if (err) return res.status(400).send(err);

         res.cookie("w_auth", user.token)
            .status(200)
            .json({ success: true, userId: user._id, token: user.token });
      });
   } catch (err) {
      console.log(err);
   }
});

Router.post("/logout", (req, res, next) => {
   const { _id } = req.body;

   User.findOneAndUpdate({ _id }, { token: "" }, (err) => {
      if (err) return res.status(400).json({ success: false, err });
      res.json({ success: true });
   });
});

module.exports = Router;
