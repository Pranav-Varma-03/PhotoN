const {Router} = require('express')
const UploadModel = require("../models/GlobalImageUploadModel");
const router = Router();
const GlobalFavUploadModel = require("../models/GlobalfavUploadModel")
const GlobalImageUploadModel = require("../models/GlobalImageUploadModel")
const mongoose = require('mongoose');

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

router.get("/api/getGlobal/:id", async (req, res) => {
  try {
    const {id} = req.params ;
    const favoriteRecords = await GlobalFavUploadModel.find({ ownerUserId: id });

    const photoIds = favoriteRecords.map(record => record.photoId);

    // Find all photos that match the extracted photoIds
    const allPhotos = await UploadModel.find({ _id: { $in: photoIds } });
    
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

router.delete("/api/removeFromGlobal/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(new mongoose.Types.ObjectId(id))
    // Remove the photo from the GlobalPhotos collection
    // await GlobalImageUploadModel.findByIdAndRemove(id);
    await GlobalImageUploadModel.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });

    // Remove the photo from the GlobalFavorites collection
    // This assumes that photoId is stored as an ObjectId, as it appears in your schema
    await GlobalFavUploadModel.deleteMany({ photoId: new mongoose.Types.ObjectId(id) });

    res.status(200).json({ message: 'Photo and its associated favorites have been removed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while removing the photo.', error: error });
  }
});

router.get("/api/getGlobalUploads/:id", async (req, res) =>{
  try{
    const {id} = req.params;
    console.log(id)
    const photos = await UploadModel.find({ ownerUserId: id });

    const photosData = photos.map(photo => ({
      _id: photo._id,
      ownerUserId: photo.ownerUserId,
      resolution: photo.resolution,
      size: photo.size,
      tags: photo.tags,
      photo: photo.photo,
    }));

    res.status(200).send(photosData);

  }catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching photos.");
  }



})










module.exports = router;
