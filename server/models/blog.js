const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {timestamps: true});

const blogSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        description2: {
            type: String,
            required: true
        },
        description3: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },

        images:[ String],


        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'client',
            required: false,
        },
        comments: [commentSchema],

    },
    {timestamps: true}
);

module.exports = mongoose.model('Blog', blogSchema);
