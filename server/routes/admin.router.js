var express = require("express");
var router = express.Router();
const controller = require("../controllers/admin.controller");
const {authAdmin, authClient} = require('../middleware/auth')

router.post('/add', authAdmin,controller.addAdmin)
router.get('/refresh_token', authClient,controller.refreshToken)
router.post('/login',controller.login)
router.get('/logout', controller.logout)
router.get('/get', authAdmin,controller.getAdmin)
router.post('/banClient', authAdmin,controller.banClient)
router.post('/banAgent', authAdmin,controller.banAgent)
router.post('/approve', authAdmin,controller.approve)




module.exports = router;
