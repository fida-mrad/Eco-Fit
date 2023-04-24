const mongoose = require("mongoose");
// const Brand = new mongoose.Schema({
//   brandname: {
//     type: String,
//     required: true,
//   },
// });
const agentSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
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
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brand',
      required: true,
    },
    // brand: {
    //   type: Brand,
    //   required: true,
    // },
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
    confirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: "Agent",
    },
    banned : {
      type : Boolean,
      required : true,
      default : false
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("agent", agentSchema);
