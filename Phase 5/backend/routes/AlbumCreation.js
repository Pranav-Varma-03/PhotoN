const express = require('express');
const {Router} = require('express')
const AlbumUploadModel = require("../models/AlbumUploadModel.js");
const router = Router();
const bodyParser = require('body-parser');
const UploadModel = require("../models/UploadModel");
const SharedAlbumModal = require("../models/SharedAlbumModel.js")

router.get("/api/getAlbums", async (req, res) => {
  const {ownerUserId} = req.query;
  console.log("Owner",ownerUserId)
  try {
    const allAlbums = await AlbumUploadModel.find({ is_folder: 0,ownerUserId:ownerUserId }).sort({ vaultName: "ascending" });
    
    // Convert documents to a format that is more convenient for the frontend
    const albumsData = allAlbums.map(album => ({
      _id: album._id,
      ownerUserId: album.ownerUserId,
      vaultName: album.vaultName,
      is_folder: album.is_folder,
      photoIDs: album.photoIDs,
    }));

    res.send(albumsData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while Album Details.");
  }
});

router.get("/api/getAlbums/withoutimage", async (req, res) => {

  const { photoId,ownerUserId } = req.query;

  try {

    const allAlbums = await AlbumUploadModel.find({
      is_folder: 0,
      ownerUserId:ownerUserId,
      photoIDs: { $nin: [photoId] }
    }).sort({ vaultName: "ascending" });

    const albumsData = allAlbums.map(album => ({
      _id: album._id,
      ownerUserId: album.ownerUserId,
      vaultName: album.vaultName,
      is_folder: album.is_folder,
      photoIDs: album.photoIDs,
    }));

    res.send(albumsData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while Album Details.");
  }
});

router.post("/api/album", async(req,res)=>{
  const {ownerUserId,vaultName} = req.body

  try {
    AlbumUploadModel.create({ 
      ownerUserId,
      vaultName
    })
      .then((data) => {
        console.log("Album Created Sucessfully");
        res.send(data);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    
  }
});

router.put("/api/album/addimage", async (req, res) => {
  const { albumId, photoId } = req.body;
  console.log(`Pic: ${photoId}`)
  console.log(`Alb: ${albumId}`)
  try {
    const updatedAlbum = await AlbumUploadModel.findOneAndUpdate(
      { _id: albumId },
      { $push: { photoIDs: photoId } },
      { new: true }
    );

    if (!updatedAlbum) {
      return res.status(404).json({ error: "Album not found" });
    }
    console.log("Added Image to Album Succesffully")
    return res.status(200).json({ message: "Photo added to album successfully", album: updatedAlbum });
  } catch (error) {
    console.error("Error adding photo to album:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/api/album/removeimage", async (req, res) => {
  
  const { albumId, photoId } = req.body;

  try {
    // Find the album by ID
    const album = await AlbumUploadModel.findById(albumId);

    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }

    // Remove the photo ID from the photoIDs array
    album.photoIDs.pull(photoId);
    await album.save();

    console.log('Photo removed from album successfully');
    return res.status(200).json({ message: 'Photo removed from album successfully', album: album });
  } catch (error) {
    console.error('Error removing photo from album:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  
});

router.delete("/api/album/remove", async (req, res) => {
  const { albumId } = req.body;

  try {
    // Remove the album entry from AlbumDetails collection
    await AlbumUploadModel.deleteOne({ _id: albumId });
    
  
    const deletedModel = await SharedAlbumModal.findOneAndDelete({ albumId: albumId });

    if (!deletedModel) {
      return res.status(404).send('Album not found');
    }

    console.log('Album removed successfully');
    return res.status(200).json({ message: 'Album removed successfully' });
  } catch (error) {
    console.error('Error removing album:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.put("/api/album/setbinflag", async (req, res) => {
  const { albumId } = req.body;

  try {
    // Get the album by ID
    const album = await AlbumUploadModel.findById(albumId);

    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }

    // Get the photo IDs associated with the album
    const photoIds = album.photoIDs;

    // Set binFlag to 1 for photos in the ImageDetails collection
    await UploadModel.updateMany(
      { _id: { $in: photoIds } },
      { $set: { binFlag: 1 } }
    );

    console.log('binFlag set to 1 for photos in the album');
    return res.status(200).json({ message: 'binFlag set to 1 for photos in the album' });
  } catch (error) {
    console.error('Error setting binFlag:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.put("/api/album/moveimage", async (req, res) => {
  const { albumId,currAlbId, photoId } = req.body;
  console.log(`Pic: ${photoId}`)
  console.log(`Curr Alb: ${currAlbId}`)
  console.log(`Alb: ${albumId}`)


  try {
    // Remove the photo from the current album
    const updatedCurrAlbum = await AlbumUploadModel.findOneAndUpdate(
      { _id: currAlbId },
      { $pull: { photoIDs: photoId } }, // Use $pull to remove the photoId from the array
      { new: true }
    );

    if (!updatedCurrAlbum) {
      return res.status(404).json({ error: "Current album not found" });
    }

    // Add the photo to the new album
    const updatedNewAlbum = await AlbumUploadModel.findOneAndUpdate(
      { _id: albumId },
      { $push: { photoIDs: photoId } },
      { new: true }
    );

    if (!updatedNewAlbum) {
      return res.status(404).json({ error: "New album not found" });
    }

    console.log("Moved Image to New Album Successfully");
    return res.status(200).json({ message: "Photo moved to new album successfully", newAlbum: updatedNewAlbum });
  } catch (error) {
    console.error("Error moving photo to new album:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

});

router.get("/api/get/albumpics", async (req, res) => {
  
  const { albumId } = req.query;

  try {
    const album = await AlbumUploadModel.findById(albumId);

    if (!album) {
      return res.status(404).send("Album not found");
    }

    const allPhotos = await UploadModel.find({
      _id: { $in: album.photoIDs },
      binFlag: 0, 
      hiddenFolderFlag: 0
    });
    // Convert documents to a format that is more convenient for the frontend
    const photosData = allPhotos.map(photo => ({
      _id: photo._id,
      dateTime: photo.dateTime,
      resolution: photo.resolution,
      size: photo.size,
      gpsData: photo.gpsData,
      type: photo.type,
      // You might want to rename 'data' to something more descriptive
      data: photo.photo,
      binFlag: photo.binFlag,
      hiddenFolderFlag: photo.hiddenFolderFlag,
      favoritesFlag: photo.favoritesFlag,
      tags: photo.tags
       // Assuming 'photo.photo' contains the base64 string
    }));

    res.send(photosData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching photos.");
  }
});

module.exports = router
