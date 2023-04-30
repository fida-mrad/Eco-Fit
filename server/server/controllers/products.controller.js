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
  getProducts: async(req, res) =>{
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
        // Méthode pour récupérer tous les produits
  getAll: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: `Une erreur est survenue lors de la récupération de tous les produits : ${err.message}` });
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
   // Méthode pour ajouter un nouveau produit
   addProduct: async (req, res) => {
    //try {

    console.log("hellooooo from product");

    console.log(req.body);
      
      const productExists = await Product.findOne({ name: req.body.name });
      
      if (productExists) {
        return res.status(409).json({ message: "Un produit avec cet nom existe déjà." });
      }
      
      const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        sku: req.body.sku,
        name: req.body.name, 
        price: req.body.price,
        discount: req.body.discount,
        offerEnd: new Date(req.body.offerEnd),
        new: Boolean(req.body.new),
        rating: req.body.rating,
        saleCount: req.body.saleCount,
        quantity: req.body.quantity,
        size:req.body.size,
        category: req.body.category,
        tag: req.body.tag,
        variation: req.body.variation,
        image: req.body.image,
        shortDescription: req.body.shortDescription,
        fullDescription: req.body.fullDescription,
      });

      console.log(product)
  
      //const newProduct = await product.save();

      product.save()
          .then(res => {
              const newItem = res;
              console.log(newItem);
          })
          .catch(err => console.log(err))
      res.status(201).json({
          message: 'Created an product using POST request',
          createdItem: product
      });

      

  },
  // Méthode pour mettre à jour un produit existant
  updateProduct: async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.productId });
      console.log(product);

      if (!product) {
        res.status(404).json({ message: 'Produit non trouvé' });
      } else {
        
        if (req.body.sku) {
          product.sku = req.body.sku;
        }
        if (req.body.name) {
          product.name = req.body.name;
        }
        if (req.body.price) {
          product.price = req.body.price;
        }
        if (req.body.discount) {
          product.discount = req.body.discount;
        }
        if (req.body.offerEnd) {
          product.offerEnd = req.body.offerEnd;
        }
        if (req.body.new) {
          product.new = req.body.new;
        }
        if (req.body.rating) {
          product.rating = req.body.rating;
        }
        if (req.body.saleCount) {
          product.saleCount = req.body.saleCount;
        }
        if (req.body.category) {
          product.category = req.body.category;
        }
        if (req.body.tag) {
          product.tag = req.body.tag;
        }
        if (req.body.variation) {
          product.variation = req.body.variation;
        }
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
      }
    } catch (err) {
      res.status(500).json({ message: `Une erreur est survenue lors de la mise à jour du produit avec l'ID ${req.params.id} : ${err.message}` });
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