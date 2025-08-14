const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Planning", "In Progress", "Completed", "On Hold"],
      default: "Planning",
    },
    budget: {
      type: Number,
    },
    office: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "office",
      required: true,
    },
    teamMembers: [
      {
        employeeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Office.employees", // Can also store email or ID for flexibility
        },
        role: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("project", projectSchema);
