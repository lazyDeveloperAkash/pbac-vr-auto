const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    date: { type: Date, required: true },
    checkIn: { type: Date },
    checkOut: { type: Date },
    status: { type: String, enum: ["Present", "Absent", "On Leave"], required: true },
  },
  { timestamps: true }
);

attendanceSchema.index({ employee: 1 });

module.exports = mongoose.model("attendance", attendanceSchema);
