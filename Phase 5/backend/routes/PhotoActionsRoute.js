const {Router} = require('express')
// const uploadMiddleware = require("../middlewares/upload");
const UploadModel = require("../models/UploadModel");
const router = Router();
const GlobalPhotoUpload = require("../models/GlobalImageUploadModel");

// router.get("/api/get", async (req, res) => {
//     const allPhotos = await UploadModel.find().sort({ createdAt: "descending" });
//     res.send(allPhotos);
//   });   


router.post("/api/photo/:id/makeGlobal", async(req, res)=>{

  const {id} = req.params ;

    const p = await UploadModel.findById(id);
    if (!p) {
      return res.status(404).send("Photo not found.");
    }

    // res.status(200).json(p);
    const ownerUserId = p.ownerUserId;
    const resolution = p.resolution;
    const size = p.size;
    const tags = p.tags;
    const photo = p.photo; 

    try 
    {
      GlobalPhotoUpload.create({
        ownerUserId ,
        resolution ,
        size ,
        tags ,
        photo ,
      }).then((data) => {
        console.log("Photo made global");
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log("Error in global photo upload: "+err);
        res.status(500).send(err) ;
      });
    }catch(error) {
      // This block now catches any other synchronous errors not related to the Promise.
      console.error("An unexpected error occurred:", error);
      res.status(500).send({ message: "An unexpected error occurred", error: error.toString() });
    }

});


router.put("/api/photo/:id/favorite", async (req, res) => {
    const { id } = req.params;
    const { isFavorite } = req.body;
  
    try {
      // Find the photo by ID
      const photo = await UploadModel.findById(id);
  
      if (!photo) {
        return res.status(404).send("Photo not found");
      }
  
      // Update the favoritesFlag property
      photo.favoritesFlag = isFavorite;
      await photo.save();
      
      res.status(200).send("Favorite status updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while updating favorite status");
    }
  });

  router.put("/api/photo/:id/edit-tags/", async (req, res) => {
    const { id } = req.params;
    const { curTags } = req.body;

    // console.log(curTags);
    // console.log("hello");
  
    try {
      // Find the photo by ID
      const photo = await UploadModel.findById(id);
  
      if (!photo) {
        return res.status(404).send("Photo not found");
      }
  
      // Update the favoritesFlag property
      photo.tags = curTags;
      await photo.save();
  
      res.status(200).send("Favorite status updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while updating favorite status");
    }
  });

  router.put("/api/photo/:id/hidden", async (req, res) => {
    const { id } = req.params;
    const { isHidden } = req.body;
  
    try {
      // Find the photo by ID
      const photo = await UploadModel.findById(id);
  
      if (!photo) {
        return res.status(404).send("Photo not found");
      }
  
      // Update the favoritesFlag property
      photo.hiddenFolderFlag = isHidden;
      await photo.save();
  
      res.status(200).send("Favorite status updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while updating favorite status");
    }
  });

  router.put("/api/photo/:id/bin", async (req, res) => {
    const { id } = req.params;
    const { isBin } = req.body;
  
    try {
      // Find the photo by ID
      const photo = await UploadModel.findById(id);
  
      if (!photo) {
        return res.status(404).send("Photo not found");
      }
  
      // Update the favoritesFlag property
      photo.binFlag = isBin;
      await photo.save();
  
      res.status(200).send("Bin status updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while updating Bin status");
    }
  });

// DELETE route to delete a photo permanently
router.delete("/api/photo/:id/remove", async (req, res) => {
  const { id } = req.params;
  console.log(id)

  try {
    const deletedPhoto = await UploadModel.findByIdAndDelete(id);

    if (!deletedPhoto) {
      return res.status(404).send('Photo not found');
    }

    res.status(200).send('Photo deleted successfully');
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).send('An error occurred while deleting the photo');
  }
});

module.exports = router;