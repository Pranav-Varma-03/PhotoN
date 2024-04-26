const mongoose = require("mongoose");

const sharedPhotoSchema = new mongoose.Schema(
  {
    photoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    sharedUserId: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
  },
  { collection: "SharedPhotos" } // Collection name for SharedPhoto model
);

module.exports = mongoose.model("SharedPhoto", sharedPhotoSchema);
