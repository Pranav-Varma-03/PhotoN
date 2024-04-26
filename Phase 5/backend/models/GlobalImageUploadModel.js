const mongoose = require("mongoose");

const GlobalImageUploadSchema = new mongoose.Schema(
  {
    ownerUserId: {
      type: String,
      required: true,
    },
    resolution: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { collection: "GlobalPhotos" }
);

module.exports = mongoose.model("GlobalPhotoUpload", GlobalImageUploadSchema);
