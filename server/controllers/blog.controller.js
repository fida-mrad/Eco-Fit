const Blog = require('../models/Blog');
const User = require('../models/client');





//*************************************Blogs*******************************************************

// Créer un nouveau blog
exports.createBlog = (req, res) => {
    const { title, description, body, images , id} = req.body;
    let author = id
    const blog = new Blog({
        title,
        description,
        body,
        images,
        author
    });

    blog.save()
        .then(result => {
            res.status(201).json({
                message: 'Le blog a été créé avec succès.',
                blog: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Une erreur est survenue lors de la création du blog.'
            });
        });
};

// Récupérer tous les blogs
exports.getAllBlogs = (req, res) => {
    Blog.find()
        .then(blogs => {
            console.log(blogs)
            res.status(200).json(blogs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Une erreur est survenue lors de la récupération des blogs.'
            });
        });
};

// Récupérer un blog spécifique
exports.getBlogById = (req, res) => {
    const { blogId } = req.params;

    Blog.findById(blogId)
        .then(blog => {
            if (!blog) {
                return res.status(404).json({
                    message: 'Le blog demandé est introuvable.'
                });
            }
            res.status(200).json(blog);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Une erreur est survenue lors de la récupération du blog.'
            });
        });
};

// Mettre à jour un blog
exports.updateBlog = (req, res) => {
    const { blogId } = req.params;

    Blog.findByIdAndUpdate(blogId, req.body, { new: true })
        .then(blog => {
            if (!blog) {
                return res.status(404).json({
                    message: 'Le blog demandé est introuvable.'
                });
            }
            res.status(200).json({
                message: 'Le blog a été mis à jour avec succès.',
                blog
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Une erreur est survenue lors de la mise à jour du blog.'
            });
        });
};

// Supprimer un blog
exports.deleteBlog = (req, res) => {
    const { blogId } = req.params;

    Blog.findByIdAndDelete(blogId)
        .then(blog => {
            if (!blog) {
                return res.status(404).json({
                    message: 'Le blog demandé est introuvable.'
                });
            }
            res.status(200).json({
                message: 'Le blog a été supprimé avec succès.'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Une erreur est survenue lors de la suppression du blog.'
            });
        });
};
//*************************************Commentaires*******************************************************
// Ajouter un commentaire à un blog
exports.addComment = async (req, res) => {
    const { author, text } = req.body;
    const { blogId } = req.params;

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog non trouvé' });
        }

        const user = await User.findById(author);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        blog.comments.push({ author: user.firstname + ' ' + user.lastname, text });

        const savedBlog = await blog.save();
        res.json(savedBlog);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};

// Modifier un commentaire d'un blog
exports.updateComment = async (req, res) => {
    const { text } = req.body;
    const { blogId, commentId } = req.params;

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        const comment = blog.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        comment.text = text;
        const savedBlog = await blog.save();
        res.json(savedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Supprimer un commentaire d'un blog
exports.deleteComment = async (req, res) => {
    const { blogId, commentId } = req.params;

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        const comment = blog.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        comment.remove();
        const savedBlog = await blog.save();
        res.json(savedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};