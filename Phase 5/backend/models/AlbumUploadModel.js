const mongoose = require("mongoose");

const albumUploadSchema = new mongoose.Schema(
  {
    ownerUserId: {
      type: String,
      required: true,
    },
    vaultName: {
      type: String,
      required: true,
    },
    is_folder: {
      type: Number,
      default: 0,
      required: true,
    },
    photoIDs: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    }
  },
  { collection: "AlbumDetails" }
);

module.exports = mongoose.model("AlbumUpload", albumUploadSchema);
