var express = require('express');
var router = express.Router();
const controller = require("../controllers/category.controller");
const {authAdmin,authAgent} = require('../middleware/auth')


router.post('/addCategory', controller.createCategory);
router.get('/getCategory',controller.getCategories);
router.put('/updateCategory/:id',controller.updateCategory)
router.delete('/deleteCategory/:id',controller.deleteCategory)
module.exports = router;