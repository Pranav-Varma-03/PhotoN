const mongoose = require("mongoose");

const GlobalFavUploadSchema = new mongoose.Schema(
  {
    ownerUserId: {
      type: String,
      required: true,
    },
    photoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { collection: "GlobalFavorites" }
);

module.exports = mongoose.model("GlobalFavUpload", GlobalFavUploadSchema);
