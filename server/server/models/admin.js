const mongoose = require("mongoose");
const Admin = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileimg: {
    type: String,
    required: false,
  },
  role : {
    type : String,
    required : true,
    default : "Admin"
  }
});
module.exports = mongoose.model("admin", Admin);
