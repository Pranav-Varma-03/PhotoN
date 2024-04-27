const {Router} = require('express')
const bcrypt = require("bcrypt");
// const uploadMiddleware = require("../middlewares/upload");
const UserUploadModel = require("../models/UserUploadModel.js");
const router = Router();
 

router.put("/api/user/updateLockPwd/:username", async (req, res) => {

  const { username } = req.params;
  const { lockedFolderPassword } = req.body;

  console.log(lockedFolderPassword);

  try {
    const user = await UserUploadModel.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(lockedFolderPassword, 10);

    // Update the user's lockedFolderPassword
    user.lockedFolderPassword = hashedPassword;
    await user.save();

    res.status(200).send("Password updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating locked folder password");
  }

});

router.put("/api/user/updatePwd/:username", async (req, res) => {

  const { username } = req.params;
  const { password } = req.body;

  try {
    const user = await UserUploadModel.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's lockedFolderPassword
    user.password = hashedPassword;
    await user.save();

    res.status(200).send("Password updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating locked folder password");
  }

});

router.put("/api/user/:username/edit-tags/", async (req, res) => {
  const { username } = req.params;
  const { curTags } = req.body;

  try {
    // Find the user by username
    const user = await UserUploadModel.findOne({ username:username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update the interestTags property
    user.interestTags = curTags;
    await user.save();

    res.status(200).send("Interest tags updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating interest tags");
  }

});

router.get("/api/userprofile/validation", async (req, res) => {
  try {
    const { username, password } = req.query;

    // Find the user with the given username
    const user = await UserUploadModel.findOne({ username });

    console.log("User")

    if (!user) {
      // If user not found, return invalid response
      return res.json([{ valid: false, interestTags: [] }]);
    }

    // Check if the password matches the stored password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      // If password is valid, return valid response
      return res.json({ valid: true, interestTags: user.interestTags });
    } else {
      // If password is invalid, return invalid response
      return res.json([{ valid: false, interestTags: [] }]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while Getting Users.");
  }
  });

  router.get("/api/auth/lock", async (req, res) => {
    const { username, password } = req.query;

    try {
      const user = await UserUploadModel.findOne({ username });
      if (!user) {
        return res.json({ valid: false });
      }
  
      // Compare the provided password with the hashed lockedFolderPassword
      const isPasswordMatch = await bcrypt.compare(password, user.lockedFolderPassword);
      if (isPasswordMatch) {
        console.log("Match")
        return res.json({ valid: true });
        // return res.status(401).send("Invalid password");
      }
      console.log("Mis-Match")
      // Password matches, send success response
      return res.json({ valid: false });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while verifying password");
    }

  });

router.get("/api/auth", async (req, res) => {
  try {
    const { username, password } = req.query;

    // Find the user with the given username
    const user = await UserUploadModel.findOne({ username });

    if (!user) {
      // If user not found, return invalid response
      return res.json([{ valid: false }]);
    }

    // Check if the password matches the stored password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      // If password is valid, return valid response
      return res.json([{ valid: true }]);
    } else {
      // If password is invalid, return invalid response
      return res.json([{ valid: false }]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while Getting Users.");
  }
  });
  
  router.post("/api/adduser", async(req,res)=>{
    const {username,password} = req.body
    
    try {

      const hashedPassword = await bcrypt.hash(password, 10);

      await UserUploadModel.create({
        username,
        password: hashedPassword
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
  