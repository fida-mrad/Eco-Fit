const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
  }
});
module.exports = mongoose.model("event", eventSchema);
