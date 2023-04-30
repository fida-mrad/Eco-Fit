var express = require("express");
var router = express.Router();
const controller = require("../controllers/products.controller");
const {authAdmin,authAgent} = require('../middleware/auth')



router.post('/addProduct',controller.addProduct)
router.post('/reviews/:id', controller.createProductReview)
router.get('/getProducts',controller.getProducts)
router.get('/getall',controller.getAll)
router.get('/getById/:productId',controller.getById)
router.put('/updateProduct/:productId',  controller.updateProduct);







module.exports = router;
