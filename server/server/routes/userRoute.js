const {Router} = require("express")
const route = Router()
const userController = require ("../controllers/userController")
const auth = require('../middleware/authUser')

route.post('/api/auth/forgot-password-user',userController.forgot)
route.post('/api/auth/reset-password-user', auth , userController.reset)



module.exports = route ;