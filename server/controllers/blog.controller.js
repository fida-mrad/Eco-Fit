const Blog = require('../models/Blog');
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


//    await blog.save()
//         .then(result => {
//             res.status(201).json({
//                 message: 'Le blog a été créé avec succès.',
//                 blog: result
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 message: 'Une erreur est survenue lors de la création du blog.'
//             });
//         });

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

// exports.createBlog = (req, res) => {
//     let form = new formildable.IncomingForm()
//     form.keepExtensions = true
//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             return res.status(400).json({
//                 error: "Image could not be uploaded"
//             })
//         }
//         //check for all fields
//         const {
//             title, description, description2,
//             description3, body
//         } = fields
//         if (!title || !description
//             || !description2 || !description3 || !body)
//             return res.status(400).json({
//                 error: "All Fields are required "
//             })
//
//
//         let blog = new Blog(fields)
//
//         if (files.images) {
//             // console.log('FILES PHOTO :', files.photo)
//             if (files.images.size > 1000000) {
//                 return res.status(400).json({
//                     error: "Image should be less than 1mb in size"
//                 })
//             }
//             blog.images.data = fs.readFileSync(files.images.filepath)
//             blog.images.contentType = files.images.type
//         }
//
//         blog.save()
//             .then(result => {
//                 res.json(result)
//             })
//             .catch(err => {
//                 return res.status(400).json({
//                     error: errorHandler(err)
//                 })
//             })
//     })
// };


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