const { Upload } = require("../models/Upload");

class UploadServices {
   save(images) {
      return new Promise(async (resolve, reject) => {
         try {
            const imagesUpload = new Upload({ images });
            const imagesData = await imagesUpload.save();
            resolve(imagesData);
         } catch (err) {
            reject(err.message);
         }
      });
   }
   get(name) {
      return new Promise(async (resolve, reject) => {
         try {
            const PORT = process.env.PORT;
            const _id = process.env.UPLOADID;
            const uploadedImages = await Upload.find({}, "images");
            console.log(uploadedImages);

            const images = uploadedImages[0].images.map(
               ({ filename, originalname }) => ({
                  title: originalname,
                  url: `${name}:${PORT}/uploads/${filename}`,
               })
            );
            resolve(images);
         } catch (err) {
            reject(err.message);
         }
      });
   }
}

module.exports = new UploadServices();
