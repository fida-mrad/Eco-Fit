const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const clientSchema = new mongoose.Schema(
  {
    facebookId: {
      type: String,
    },
    googleId: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    birthdate: {
      type: Date,
    },
    profileimg: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    tfaSecret :{
      type : String ,
      required : false
    },
    tfa : {
      type : Boolean,
      default : false
    },
    banned : {
      type : Boolean,
      required : true,
      default : false
    },
    role: {
      type: String,
      required: true,
      default: "Client",
    },
  },
  {
    timestamps: true,
  }
);

clientSchema.plugin(findOrCreate);

module.exports = mongoose.model("client", clientSchema);
