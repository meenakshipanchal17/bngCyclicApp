const express = require("express");
const queryModal = require("../modals/queryModal");


const router = express.Router();

router.post("/submit", (req, res) => {
  const { queryfirstName, querysecondName, queryemail,querymessage } = req.body;
  const contactusQuery = new queryModal({
    queryfirstName, querysecondName, queryemail,querymessage
  });
  try {
    contactusQuery.save();
    res.status(200).json({
      success: true,
      message: "Register Success",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

module.exports = router;
