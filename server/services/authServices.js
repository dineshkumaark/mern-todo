const { User } = require("../models/User");

class AuthServices {
   saveDetails(user) {
      const userData = new User(user);
      return new Promise(async (resolve, reject) => {
         try {
            const data = await User.findOne({ email: user.email });
            if (data) throw new Error("User Already Registered");
            await userData.save();
            resolve();
         } catch (err) {
            reject(err.message);
         }
      });
   }

   loginUser(user) {
      const { email, password } = user;
      return new Promise(async (resolve, reject) => {
         try {
            const userExits = await User.findOne({ email });
            if (!userExits) throw new Error("User Not Registered");

            const isMatch = userExits.comparePassword(password);
            if (!isMatch) throw new Error("Invalid Password");

            userExits.generateToken((err, user) => {
               if (err) throw err;
               resolve(user);
            });
         } catch (err) {
            reject(err.message);
         }
      });
   }

   logoutUser(user) {
      const { _id } = user;
      return new Promise(async (resolve, reject) => {
         try {
            await User.findOneAndUpdate({ _id }, { token: "" });
            resolve();
         } catch (err) {
            reject(err.message);
         }
      });
   }
}

module.exports = new AuthServices();
