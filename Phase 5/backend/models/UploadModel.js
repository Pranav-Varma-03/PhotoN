const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    ownerUserId: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      default: Date.now,
    },
    resolution: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    gpsData: {
      type: String,
      default: "17.490259 78.380326", // Default GPS Data
    },
    type: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    binFlag: {
      type: Number,
      default: 0,
    },
    hiddenFolderFlag: {
      type: Number,
      default: 0,
    },
    favoritesFlag: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { collection: "ImageDetails" }
);

module.exports = mongoose.model("Upload", uploadSchema);