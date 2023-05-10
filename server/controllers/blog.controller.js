const Blog = require('../models/blog');
const User = require('../models/client');
const formildable = require("formidable")
const multer = require("multer")
const fs = require("fs");

exports.photomiddleware = multer ({
    dest : "uploads/",
    limits : {
        fileSize : 1024 * 1024 * 10
    }
})


//*************************************Blogs*******************************************************

// Créer un nouveau blog

exports.uploadsImages = async (req , res) =>{
    const uploadFiles = [];
    for (let i=0 ; i<req.files.length ; i++){
        const {path , originalname} = req.files[i];

        const ext = originalname.split(".")[1];
        const  newPath = path + "." + ext;

        fs.renameSync(path , newPath)

        uploadFiles.push(newPath.replace("uploads\\" , ""))
    }
    res.json(uploadFiles);
}
// Créer un nouveau blog

exports.createBlog = async (req, res) => {

    const { title, description,description2, description3, body,id, images } = req.body
    let author = id




    try {
        const blog = await Blog.create({
            title,
            description,
            description2,
            description3,
            body,
            images,
            author
        });
        res.json (blog)
    } catch (err){
        res.status(422).json(err)
    }

};


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

// recuperer tous les blog sauf current blog !!!

exports.getAllBlogsExceptCurrent = (req, res) => {
    const { currentBlogId } = req.params;

    Blog.find({ _id: { $ne: currentBlogId } })
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Une erreur est survenue lors de la récupération des blogs.'
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
    const { id, text } = req.body;
    const { blogId } = req.params;
    console.log(req.body)

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog non trouvé' });
        }

        const user = await User.findById(id);
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