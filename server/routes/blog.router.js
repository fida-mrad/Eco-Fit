const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const {authClient} = require("../middleware/auth");

// Routes pour les blogs
router.get('/', blogController.getAllBlogs);
router.post('/addBlog',authClient , blogController.createBlog);
router.get('/:blogId', blogController.getBlogById);
router.put('/:blogId', authClient, blogController.updateBlog);
router.delete('/:blogId', authClient,blogController.deleteBlog);

// Routes pour les commentaires
router.post('/:blogId/comments', authClient,blogController.addComment);
router.put('/:blogId/comments/:commentId', authClient,blogController.updateComment);
router.delete('/:blogId/comments/:commentId',authClient, blogController.deleteComment);

module.exports = router;
