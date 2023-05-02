const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const {authClient} = require("../middleware/auth");
const upload = require('../middleware/imageUpload');
const {uploadsImages, photomiddleware} = require("../controllers/blog.controller");



// Routes pour les blogs
router.post("/uploadByFile" , photomiddleware.array("photos" , 15) , uploadsImages)
router.get('/', blogController.getAllBlogs);
router.post('/addBlog'  ,blogController.createBlog);
router.get('/:blogId', blogController.getBlogById);
router.put('/:blogId', authClient, blogController.updateBlog);
router.delete('/:blogId', authClient,blogController.deleteBlog);

// Routes pour les commentaires
router.post('/:blogId/comments',blogController.addComment);
router.put('/:blogId/comments/:commentId', authClient,blogController.updateComment);
router.delete('/:blogId/comments/:commentId',authClient, blogController.deleteComment);

module.exports = router;
