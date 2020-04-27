const express = require("express");
const Router = express.Router();
const multer = require("multer");
const { storage } = require("../middleware/upload");

const upload = multer({ storage });
const uploadController = require("../controllers/uploadcontroller");

Router.post("/upload", upload.array("file"), uploadController.uploadImages);

Router.get("/", uploadController.getImages);

module.exports = Router;
