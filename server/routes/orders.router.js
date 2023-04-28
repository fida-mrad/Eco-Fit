var express = require('express');
var router = express.Router();
const controller = require("../controllers/orders.controller");
const {authAdmin,authAgent} = require('../middleware/auth')


router.post('/addOrders', controller.addOrders);
router.get('/getOrders',controller.getOrders);
router.get('/getOrderById/:id',controller.getOrderById)
router.delete('/deleteOrder/:id',controller.deleteOrder)
module.exports = router;