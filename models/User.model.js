const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  subName: String,
  password: String,
  phone: String,
  email: String,
  address: String,
  zipCode: String,
  role: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
