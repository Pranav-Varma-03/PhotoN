const mongoose = require("mongoose");

const userUploadSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },  
    followersCount: {
      type: Number,
      default: 0,
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    interestTags: {
      type: [String],
      default: [],
    },
    lockedFolderPassword: {
      type: String,
      default: "LOCK",
    },
  },
  { collection: "UserUploads" }
);

module.exports = mongoose.model("UserUpload", userUploadSchema);
