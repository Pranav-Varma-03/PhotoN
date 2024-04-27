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
    interestTags: {
      type: [String],
      default: [],
    },
    lockedFolderPassword: {
      type: String,
      default: "$2b$10$uhNbJORyQUEA4ojyOxoec.J4zUN96EtYY729Fe88GBvtPs4Fo/9BO",
    },
  },
  { collection: "UserUploads" }
);

module.exports = mongoose.model("UserUpload", userUploadSchema);
