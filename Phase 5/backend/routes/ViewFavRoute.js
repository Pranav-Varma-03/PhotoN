const {Router} = require('express')
// const uploadMiddleware = require("../middlewares/upload");
const UploadModel = require("../models/UploadModel");
const router = Router();

router.get("/api/get/fav", async (req, res) => {
    const {username} = req.query;
    try {
      // Modify the find query to filter for photos where binFlag is set to 1
      const binPhotos = await UploadModel.find({ favoritesFlag: 1, binFlag: 0, hiddenFolderFlag: 0,ownerUserId  :username }).sort({ createdAt: "descending" });
      // console.log("hello");
      // Convert documents to a format that is more convenient for the frontend
      const photosData = binPhotos.map(photo => ({
        _id: photo._id,
        dateTime: photo.dateTime,
        resolution: photo.resolution,
        size: photo.size,
        gpsData: photo.gpsData,
        type: photo.type,
        data: photo.photo, // Assuming 'photo.photo' contains the base64 string
        // Include the binFlag attribute in the response if you want to use it on the frontend
        binFlag: photo.binFlag,
        hiddenFolderFlag: photo.hiddenFolderFlag,
        favoritesFlag: photo.favoritesFlag,
        tags: photo.tags
      }));
  
      res.send(photosData);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching bin photos.");
    }
  });

  module.exports = router