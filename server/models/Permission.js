// models/permissionModel.js
const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    office: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "office",
      required: true,
    },
    module: {
      type: String,
      enum: ["User", "Office", "Task", "Project"],
      required: true,
    },
    canCreate: { type: Boolean, default: false },
    canRead: { type: Boolean, default: true },
    canUpdate: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

permissionSchema.index({ user: 1, office: 1 });

module.exports = mongoose.model("permission", permissionSchema);
