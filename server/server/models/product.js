const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const productSchema = new mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  sku: { type: String },
  name: { type: String },
  price: { type: Number},
  discount: { type: Number, required: false },
  offerEnd: { type: Date, required: false},
  new: { type: Boolean, required: false },
  rating: { type: Number, required: false },
  saleCount: { type: Number, required: false },
  quantity: { type: Number },
  size:{ type: String },
  category: { type: String, required: false },
  tag: { type: [String], required: false },
  variation: {
    type: [
      {
        color: { type: String },
        image: { type: String },
        size: [
          {
            name: { type: String },
            stock: { type: Number },
          },
        ],
      },
    ],
   // required: true,
  },
  image: { type: Object, required: false },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    
    default: 0,
  },
  numReviews: {
    type: Number,
   
    default: 0,
  },
  shortDescription: { type: String },
  fullDescription: { type: String },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;