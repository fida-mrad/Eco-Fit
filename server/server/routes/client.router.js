const express = require('express');
const router = express.Router();
const passport = require('passport');
const {authClient} = require('../middleware/auth')



// import the client controller
const clientsController = require('../controllers/client.controller');

router.put('/updateClient', authClient,clientsController.updateClient);
// router.put('/updateClient', clientsController.updateClient);

/**
 * @route GET /client
 * @desc Get all client from the database
 * @access Public
 */
router.get('/', clientsController.client_GET_ALL);


/**
 * @route GET /client/:clientID
 * @desc Get a single client
 * @access Public
 */
router.get('/:clientId', clientsController.client_GET_ONE);


/**
 * @route POST /client
 * @desc Create a new client
 * @access Public
 */
router.post('/', clientsController.client_POST);


/**
 * @route POST /client/login/facebook
 */
router.post('/login/facebook', passport.authenticate('facebook-token'), clientsController.client_loginFacebook);



// Exporting the router
module.exports = router;