const {Router} = require('express')
// const uploadMiddleware = require("../middlewares/upload");
const UserUploadModel = require("../models/UserUploadModel.js");
const router = Router();

// router.get("/api/get", async (req, res) => {
//     const allPhotos = await UploadModel.find().sort({ createdAt: "descending" });
//     res.send(allPhotos);
//   });   
router.get("/api/getusers", async (req, res) => {
    try {
      const allUsers = await UserUploadModel.find({is_folder: 0}).sort({ vaultName: "ascending" });
      
      // Convert documents to a format that is more convenient for the frontend
      const users = allUsers.map(user => ({
        _id: user._id,
        username: user.username,
      }));
  
      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while Album Details.");
    }
  });
  
  router.post("/api/adduser", async(req,res)=>{
    const {username,password} = req.body
    
    try {
      await UserUploadModel.create({
        username,
        password
      });
      console.log("User Created Successfully");
      res.send({ valid: 1 }); // User created successfully
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyValue) {
        console.log("Duplicate username error:", error.keyValue.username);
        res.send({ valid: 0, error: "Username already exists" });
      } else {
        console.log("Unexpected error:", error);
        res.send({ valid: 0, error: "An unexpected error occurred" });
      }
    }
    
  })
  
  module.exports = router
  