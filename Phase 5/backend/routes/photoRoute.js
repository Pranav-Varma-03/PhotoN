const { Router } = require('express')
// const uploadMiddleware = require("../middlewares/upload");
const UploadModel = require("../models/UploadModel");
// const GlobalFavUploadModel = require("../models/GlobalFavUploadModel")
const router = Router();
const GlobalFavUploadModel = require("../models/GlobalfavUploadModel")
const GlobalImageUploadModel = require("../models/GlobalImageUploadModel")

router.get("/api/photo-details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const Viewphoto = await UploadModel.find({ _id: id, binFlag: { $ne: 1 }, hiddenFolderFlag: 0 });

    const photosData = Viewphoto.map(photo => ({
      _id: photo._id,
      dateTime: photo.dateTime,
      resolution: photo.resolution,
      size: photo.size,
      gpsData: photo.gpsData,
      type: photo.type,
      data: photo.photo, // Assuming 'photo.photo' contains the base64 string
      // Include the binFlag attribute in the response if you want to use it on the frontend
      favoritesFlag: photo.favoritesFlag,
      binFlag: photo.binFlag,
      hiddenFolderFlag: photo.hiddenFolderFlag,
      tags: photo.tags
    }));
    // console.log(photosData)
    res.send(photosData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the photos.");
  }
});

router.post("/api/global/photo-details/:id/:cur_user/liking", async (req, res) => {
  const { photoId, userid } = req.body
  try {
    GlobalFavUploadModel.create({
      ownerUserId: userid,
      photoId: photoId
    })
      .then((data) => {
        console.log("Photo Liked Sucessfully");
        res.status(201).send(data);
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send(data)
      });
  } catch (error) {

  }
})

router.post("/api/global/photo-details/:id/:cur_user/disliking", async (req, res) => {
  const { photoId, userid } = req.body;
  try {
    // Deleting the record from the database
    GlobalFavUploadModel.findOneAndDelete({
      ownerUserId: userid,
      photoId: photoId
    })
      .then((deletedRecord) => {
        if (deletedRecord) {
          console.log("Photo disliked successfully");
          res.status(200).send({ message: "Photo disliked successfully", deletedRecord });
        } else {
          // No document found to delete
          res.status(404).send({ message: "No like found to delete" });
        }
      })
      .catch((err) => {
        console.error("Error during disliking the photo:", err);
        res.status(500).send({ message: "Error disliking the photo" });
      });
  } catch (error) {
    console.error("Server error during disliking the photo:", error);
    res.status(500).send({ message: "Server error during disliking the photo" });
  }
});

router.get("/api/check-like/:id/:cur_user", async (req, res) => {
  const { id, cur_user } = req.params;
  console.log(id, " ", cur_user)
  try {
    const likeExists = await GlobalFavUploadModel.findOne({
      photoId: id,
      ownerUserId: cur_user
    });
    console.log("Like status of the photo of the user: ", !!likeExists)
    res.json({ isLiked: !!likeExists })
  } catch (error) {
    console.error('Failed to check like status:', error);
    res.status(500).send('Error checking like status');
  }
})

router.get("/api/global/photo-details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const p = await GlobalImageUploadModel.findById(id);

    const globalPhoto = {
      _id: p._id,
      ownerUserId: p.ownerUserId,
      resolution: p.resolution,
      size: p.size,
      tags: p.tags,
      photo: p.photo,
    }
    // console.log(p.ownerUserId);
    res.send(globalPhoto);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the photos.");
  }
})


router.get("/api/bin/photo-details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const ViewBinphoto = await UploadModel.find({ _id: id, binFlag: { $ne: 0 } });

    const photosDataBin = ViewBinphoto.map(photo => ({
      _id: photo._id,
      dateTime: photo.dateTime,
      resolution: photo.resolution,
      size: photo.size,
      gpsData: photo.gpsData,
      type: photo.type,
      data: photo.photo, // Assuming 'photo.photo' contains the base64 string
      // Include the binFlag attribute in the response if you want to use it on the frontend
      favoritesFlag: photo.favoritesFlag,
      hiddenFolderFlag: photo.hiddenFolderFlag,
      binFlag: photo.binFlag,
      tags: photo.tags
    }));
    // console.log(photosDataBin)
    res.send(photosDataBin);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the photos.");
  }
});

router.get("/api/share/photo-details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ViewBinphoto = await UploadModel.find({ _id: id });

    const photosDataBin = ViewBinphoto.map(photo => ({
      _id: photo._id,
      dateTime: photo.dateTime,
      resolution: photo.resolution,
      size: photo.size,
      gpsData: photo.gpsData,
      type: photo.type,
      data: photo.photo, // Assuming 'photo.photo' contains the base64 string
      // Include the binFlag attribute in the response if you want to use it on the frontend
      favoritesFlag: photo.favoritesFlag,
      hiddenFolderFlag: photo.hiddenFolderFlag,
      binFlag: photo.binFlag,
      tags: photo.tags
    }));
    // console.log(photosDataBin)
    res.send(photosDataBin);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the photos.");
  }
});


router.get("/api/lock/photo-details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ViewBinphoto = await UploadModel.find({ _id: id, binFlag: 0, hiddenFolderFlag: 1 });

    const photosDataBin = ViewBinphoto.map(photo => ({
      _id: photo._id,
      dateTime: photo.dateTime,
      resolution: photo.resolution,
      size: photo.size,
      gpsData: photo.gpsData,
      type: photo.type,
      data: photo.photo, // Assuming 'photo.photo' contains the base64 string
      // Include the binFlag attribute in the response if you want to use it on the frontend
      favoritesFlag: photo.favoritesFlag,
      hiddenFolderFlag: photo.hiddenFolderFlag,
      binFlag: photo.binFlag,
      tags: photo.tags
    }));
    // console.log(photosDataBin)
    res.send(photosDataBin);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the photos.");
  }
});

module.exports = router