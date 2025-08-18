const mongoose = require("mongoose");

const officeModel = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Office Name is required"],
    },
    location: {
      type: String
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project",
      },
    ],
});

module.exports = mongoose.model("office", officeModel);