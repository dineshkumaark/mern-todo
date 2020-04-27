const uploadServices = require("../services/uploadServices");

const uploadImages = async (req, res, next) => {
   try {
      await uploadServices.save(req.files);
      res.send({ status: true, message: "Images Uploaded Successfully" });
   } catch (err) {
      res.status(400).send({ status: false, message: err });
   }
};

const getImages = async (req, res, next) => {
   try {
      const images = await uploadServices.get(req.hostname);
      res.send({ status: true, images });
   } catch (err) {
      res.status(400).send({ status: false, message: err });
   }
};

module.exports = { uploadImages, getImages };
