const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    office: { type: mongoose.Schema.Types.ObjectId, ref: "Office", required: true },
    head: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("department", departmentSchema);
