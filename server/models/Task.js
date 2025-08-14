const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    dueDate: { type: Date },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskSchema);
