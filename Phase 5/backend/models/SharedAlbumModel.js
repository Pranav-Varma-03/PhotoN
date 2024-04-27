const mongoose = require("mongoose");

const sharedAlbumSchema = new mongoose.Schema(
  {
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    sharedUserId: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
  },
  { collection: "SharedAlbum" } // Collection name for SharedPhoto model
);

module.exports = mongoose.model("SharedAlbum", sharedAlbumSchema);
