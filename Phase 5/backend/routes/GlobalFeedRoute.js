const {Router} = require('express')
const UploadModel = require("../models/GlobalImageUploadModel");
const router = Router();

router.get("/api/getGlobal", async (req, res) => {
  try {
    const allPhotos = await UploadModel.find({});
    
    const photosData = allPhotos.map(photo => ({
      _id: photo._id,
      resolution: photo.resolution,
      size: photo.size,
      tags: photo.tags,
      photo: photo.photo,
    }));

    res.status(201).send(photosData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching photos.");
  }
});

module.exports = router;
