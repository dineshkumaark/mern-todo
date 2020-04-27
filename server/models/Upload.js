const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
   images: [{ type: Object }],
});

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = { Upload };
