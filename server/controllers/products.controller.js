const Product = require("../models/product");
const _ = require("lodash");
const mongoose = require("mongoose");
const Brand = require("../models/brand");
// Filter, sorting and paginating

class APIfeatures {
  constructor(query, queryString){
      this.query = query;
      this.queryString = queryString;
  }
  filtering(){
     const queryObj = {...this.queryString} //queryString = req.query

     const excludedFields = ['page', 'sort', 'limit']
     excludedFields.forEach(el => delete(queryObj[el]))
     
     let queryStr = JSON.stringify(queryObj)
     queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)


     this.query.find(JSON.parse(queryStr))
       
     return this;
  }

  sorting(){
      if(this.queryString.sort){
          const sortBy = this.queryString.sort.split(',').join(' ')
          this.query = this.query.sort(sortBy)
      }else{
          this.query = this.query.sort('-createdAt')
      }

      return this;
  }

  paginating(){
      const page = this.queryString.page * 1 || 1
      const limit = this.queryString.limit * 1 || 9
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit)
      return this;
  }
}

const productsController ={

    // Méthode pour récupérer tous les produits
  getAll: async(req, res) =>{

    try {
        const features = new APIfeatures(Product.find(), req.query)
        .filtering().sorting().paginating()

        const products = await features.query

        res.json({
            status: 'success',
            result: products.length,
            products: products
        })
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},

       

 
  getById: async (req, res) => {
    try {
      const product = await Product.findOne({_id: req.params.productId});

      if (!product) {
        res.status(404).json({ message: 'Produit non trouvé' });
      } else {
        res.status(200).json(product);
      }
    } catch (err) {
      res.status(500).json({ message: `Une erreur est survenue lors de la récupération du produit avec l'ID ${req.params.id} : ${err.message}` });
    }
  },

   
  addProduct: async (req, res) => {
    try {
        const { name, price, discount, offerEnd, category, tag, variation, images, shortDescription, fullDescription, materials, brand } = req.body;

        const product = await Product.findOne({ name });
        if (product) {
            return res.status(400).json({ msg: "This product already exists." });
        }

        const newProduct = new Product({
          _id: new mongoose.Types.ObjectId(),
            name,
            price,
            discount,
            offerEnd,
            category,
            tag,
            variation,
            images,
            shortDescription,
            fullDescription,
            materials,
            brand
        });

        await newProduct.save();
        res.json({ msg: "Product created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
},
  // Méthode pour mettre à jour un produit existant
  updateProduct: async (req, res) => {
    try {
      const { name, price, discount, offerEnd, category, tag, variation, images, shortDescription, fullDescription, materials, brand } = req.body;
      
  
      await Product.findByIdAndUpdate(req.params.id, {
        name: name ? name.toLowerCase() : '',
        price,
        discount,
        offerEnd,
        category: Array.isArray(category) ? category : [category],
        tag: Array.isArray(tag) ? tag : [tag],
        variation: Array.isArray(variation) ? variation : [variation],
        images: Array.isArray(images) ? images : [images],
        shortDescription,
        fullDescription,
        materials: Array.isArray(materials) ? materials : [materials],
        brand
      }, { new: true });
     
  
      res.json({ msg: "Updated a Product" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Server error" });
    }
  },
  deleteProduct: async(req, res) =>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json({msg: "Deleted a Product"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},


  

  createProductReview: async (req, res) => {
    const { name,rating, comment } = req.body;
  
    try {
      const product = await Product.findOne({ _id: req.params.id });
  
      const review = {
        name,
        rating: Number(rating),
        comment,
        
      };
  
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
  
      const ratingSum = product.reviews.reduce((acc, item) => acc + item.rating, 0);
      product.rating = ratingSum / product.reviews.length;
  
      await product.save();
  
      res.status(201).json({ message: 'Review added' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  





}
module.exports = productsController;