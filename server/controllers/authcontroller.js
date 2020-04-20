const bcrypt = require("bcryptjs");
const authServices = require("../services/authServices");

const registerController = async (req, res, next) => {
   const hashedPass = bcrypt.hashSync(req.body.password);
   req.body.password = hashedPass;

   try {
      await authServices.saveDetails(req.body);
      res.status(200).json({
         success: true,
         message: "Registered Successfully",
      });
   } catch (err) {
      res.status(400).send({ success: false, message: err });
   }
};

const loginController = async (req, res, next) => {
   try {
      const user = await authServices.loginUser(req.body);
      res.cookie("w_auth", user.token)
         .status(200)
         .json({ success: true, userId: user._id, token: user.token });
   } catch (err) {
      res.status(400).send({ success: false, message: err });
   }
};

const logoutController = async (req, res, next) => {
   try {
      await authServices.logoutUser(req.body);
      res.status(200).send({
         success: true,
         message: "Logged Out Successfully",
      });
   } catch (err) {
      res.status(400).send({ success: false, message: err });
   }
};

module.exports = { registerController, loginController, logoutController };
