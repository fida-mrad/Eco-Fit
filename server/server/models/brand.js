const mongoose = require("mongoose");
const Brand = new mongoose.Schema({
  brandname: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("brand", Brand);
