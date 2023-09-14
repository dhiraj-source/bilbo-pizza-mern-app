const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const authMiddleware = require('../middlewares/authMiddleware')


//================== USER REGISTER ==================//

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(401).json({ success: false, message: `this eamil: ${email} already exist` })
  }

  try {
    const user = await User.create({ name, email, password });

    const token = user.createJWT()

    res.status(200).json({
      _id: user._id,
      success: true,
      message: "Register success",
      token
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});


//================== USER LOGIN ==================//

router.post("/login", authMiddleware, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const currentUser = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user.Id,
      }
      res.status(200).json({ currentUser, message: "Login Successful" });
      // if (user.length > 0) {
      //   const currentUser = {
      //     name: user[0].name,
      //     email: user[0].email,
      //     isAdmin: user[0].isAdmin,
      //     _id: user[0]._id,
      //   };
      //   res.status(200).json({ currentUser, message: "Login Successful" });

    } else {
      res.status(400).json({
        message: "Login Failed",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Something Went wrong",
    });
  }
});

//================== GET USER ==================//


router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});


//================== DELETE USER ==================//

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;
  try {
    await User.findOneAndDelete({ _id: userid });
    res.status(200).send("User Deleted");
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});

module.exports = router;