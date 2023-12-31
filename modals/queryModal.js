const mongoose = require("mongoose");

const ContactQuery = mongoose.Schema(
  {
    queryfirstName: {
      type: String,
      required: [true, "First Name Is Required"],
    },
    querysecondName: {
      type: String,
      required: [true, "Second Name Is Required"],
    },

    queryemail: {
      type: String,
      required: [true, "Email Is Required"],
    },
    querymessage: {
        type: String,
        required: [true, "Message Is Required"],
      },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Contact", ContactQuery);
