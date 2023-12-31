const express = require("express");
const router = express.Router();
const Admin = require("../modals/adminModal");

router.post("/login", async (req, res) => {
  const { officialname, password, officialemail } = req.body;
  try {
    const admin = await Admin.find({ officialname, password, officialemail });
    if (admin.length > 0) {
      const currentAdmin = {
        officialname: admin[0].officialname,
        password: admin[0].password,

        officialemail: admin[0].officialemail,

        _id: admin[0]._id,
      };
      res.status(200).send(currentAdmin);
    } else {
      res.status(400).json({
        message: "Login Failed",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Something Went Wrong",
    });
  }
});

module.exports = router;
