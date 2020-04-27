const mongoose = require("mongoose");

const initializeDB = () => {
   let MONGODBURL = process.env.MONGODBURI;
   mongoose.connect(
      MONGODBURL,
      {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
         useCreateIndex: true,
      },
      (err, data) => {
         if (err) return console.error(err.message);

         console.log("-------------- Mongo_DB Connected --------------");
      }
   );
};

module.exports = initializeDB;
