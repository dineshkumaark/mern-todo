const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "public", "uploads"));
   },
   filename: function (req, file, cb) {
      let originalname = file.originalname;
      const extension = path.extname(originalname);
      originalname = originalname.split(extension)[0];
      file.originalname = originalname;
      cb(null, originalname + "-" + Date.now() + extension);
   },
});

module.exports = { storage };
