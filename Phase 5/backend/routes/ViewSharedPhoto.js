const { Router } = require('express')
// const uploadMiddleware = require("../middlewares/upload");
const sharedPhoto = require("../models/SharedPhotoModel");
const UploadModel = require("../models/UploadModel");
const userModel = require("../models/UserUploadModel")
const router = Router();

router.get("/api/get/view-photo-shared", async (req, res) => {
    const { username } = req.query;
    console.log(username);
    try {

        // First, get the user ID based on the username
        const user = await userModel.findOne({ username:username }); // change her eto username i think ther is problem with test
        // console.log(user);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        const sharedPhotoRows = await sharedPhoto.find({ sharedUserId: { $in: user._id } });
        const photoIds = sharedPhotoRows.map((row) => row.photoId);

        const photosData = await UploadModel.find({ _id: { $in: photoIds } });

        const photosSharedData = photosData.map(photo => ({
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
      
          res.send(photosSharedData);

    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching bin photos.");
    }
});

module.exports = router 