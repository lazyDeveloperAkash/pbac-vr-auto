const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Leave = require("./Leave");
const Permission = require("./Permission");
const Attendance = require("./Attendance");

const userModel = mongoose.Schema({
  name: {
    type: String,
    minLength: [4, "Name should be atleast 4 character "],
    require: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: [true, "Email is already Exist"],
    require: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    select: false,
  },
  role: {
    type: String,
    enum: ["ADMIN", "EMPLOYEE"],
    default: "EMPLOYEE"
  },
  office: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "office"
  }
});

//save password with hash
userModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

//compare password
userModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//jwt
userModel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id, role: this.role, office: this.office }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Delete task while delte project
userModel.pre("findOneAndDelete", async function (next) {
  const userId = this?.getQuery()?._id;
  await Permission.deleteMany({ user: userId });
  await Leave.deleteMany({ employee: userId });
  await Attendance.deleteMany({ employee: userId });
  next();
});

module.exports = mongoose.model("user", userModel);