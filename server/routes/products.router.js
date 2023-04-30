var express = require("express");
var router = express.Router();
const controller = require("../controllers/products.controller");
const {authAdmin,authAgent} = require('../middleware/auth')



router.post('/addProduct',controller.addProduct)
//router.post('/reviews/:id', controller.createProductReview)
router.get('/getall',controller.getAll)
router.get('/getById/:id',controller.getById)
router.put('/updateProduct/:id',  controller.updateProduct);
router.delete('/deleteProduct/:id',controller.deleteProduct)

module.exports = router;
