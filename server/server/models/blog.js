const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },    
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    author:{
        type : String,
        required : true
    },
    date : {
        type: Date,
        required: true,
        default : Date.now()
    },

})
module.exports = mongoose.model('blog', blogSchema);