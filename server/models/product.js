
const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
      required: true,
    },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, required: true },

  },
  {
    timestamps: true,
  }
);
const variantSchema = new mongoose.Schema({
  color: { type: String },
  image: { type: String },
  size: [
    {
      name: { type: String },
      stock: { type: Number },
    },
  ],
});
const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  price: { type: Number },
  discount: { type: Number, required: false },
  offerEnd: { type: Date, required: false },
  new: { type: Boolean, required: false },
  category: { type: [String], required: false },


  tag: { type: [String], required: false },
  variation: {
    type: [
      {
        color: { type: String },
<<<<<<< HEAD
        
=======

>>>>>>> b7930528c058bacf8ed64f99a365e93ec8753f82
        size: [
          {
            name: { type: String },
            stock: { type: Number },
          },
        ],
      },
    ],

  },
  images: {
    type: [String],
    required: true,
  },
  reviews: [reviewSchema],

  shortDescription: { type: String },
  fullDescription: { type: String },
  materials: {
    type: [
      {
        name: { type: String },
        percentage: { type: Number },
      },
    ],
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brand",
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);


module.exports = Product;