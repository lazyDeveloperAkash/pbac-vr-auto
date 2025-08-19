const mongoose = require("mongoose");
const Task = require("./Task");

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

//Delete task while delte project
projectSchema.pre("findOneAndDelete", async function (next) {
    const projectId = this?.getQuery()?._id;
    await Task.deleteMany({ project: projectId });
  next();
});

projectSchema.index({ office: 1 });

module.exports = mongoose.model("project", projectSchema);
