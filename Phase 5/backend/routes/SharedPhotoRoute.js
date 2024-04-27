const { Router } = require('express');
const SharedPhoto = require('../models/SharedPhotoModel'); // Adjusted model path
const UserUpload = require('../models/UserUploadModel'); // Adjusted model path
const SharedAlbum = require('../models/SharedAlbumModel');
const router = Router();


// Route to check if a username exists
router.post('/api/check-username', async (req, res) => {
  const { username } = req.body;
 
  if (username.trim() === '') {
    alert('username cannot be empty.');
    return false; // Prevent adding the tag
  }

  try { 

    console.log(username);
    const existingUser = await UserUpload.findOne({ username: username });
    console.log(existingUser)
    if (existingUser) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/api/photo/share-photo/', async (req, res) => {

  try {

    const { photoId, curUsers } = req.body;

    // console.log(photoId);
    // console.log(curUsers);

    let existingShare = await SharedPhoto.findOne({ photoId: photoId });
    const users = await UserUpload.find({ username: { $in: curUsers } });
    const userIds = users.map(user => user._id);

    if (existingShare) {
      existingShare.sharedUserId = userIds;
      await existingShare.save();
    } else {
      // If no row exists, create a new one with userIds
      await SharedPhoto.create({ photoId, sharedUserId: userIds });
    }

    return res.status(200).json({ message: 'Shared photo updated successfully' });
  } catch (error) {
    console.error('Error while updating shared photo:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.get("/api/photo/sharedUsers", async (req, res) => {

  const { photoid } = req.query;
  try {
    const sharedPhoto = await SharedPhoto.findOne({ photoId: photoid });

    // console.log(sharedPhoto);

    if (!sharedPhoto) {
      return res.send([]);
    }

    // Fetch usernames for the shared user IDs
    const sharedUsers = await UserUpload.find({
      _id: {
        $in: sharedPhoto.sharedUserId
      }
    });

    console.log(sharedUsers);
    res.send(sharedUsers);
 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/api/album/share-photo/', async (req, res) => {

  try {

    const { albumId, curUsers } = req.body;

    // console.log(albumId);
    // console.log(curUsers);

    let existingShare = await SharedAlbum.findOne({ albumId: albumId });
    const users = await UserUpload.find({ username: { $in: curUsers } });
    const userIds = users.map(user => user._id);

    if (existingShare) {
      existingShare.sharedUserId = userIds;
      await existingShare.save();
    } else {
      // If no row exists, create a new one with userIds
      await SharedAlbum.create({ albumId, sharedUserId: userIds });
    }

    return res.status(200).json({ message: 'Shared photo updated successfully' });
  } catch (error) {
    console.error('Error while updating shared photo:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.get("/api/album/sharedUsers", async (req, res) => {

  const { albumid } = req.query;
  try {
    const sharedPhoto = await SharedAlbum.findOne({ albumId: albumid });

    // console.log(sharedAlbum);

    if (!sharedPhoto) {
      return res.send([]);
    }

    // Fetch usernames for the shared user IDs
    const sharedUsers = await UserUpload.find({
      _id: {
        $in: sharedPhoto.sharedUserId
      }
    });

    console.log(sharedUsers);
    res.send(sharedUsers);
 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;  