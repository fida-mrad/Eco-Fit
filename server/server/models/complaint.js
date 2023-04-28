const mongoose = require("mongoose");
const complaintSchema = new mongoose.Schema({
    reason: {
        type: String,
        required: true
    },    
    date : {
        type: Date,
        required: true,
        default : Date.now()
    },
    status : {
        type : Boolean,
        required : true
    },

})
module.exports = mongoose.model('complaint', complaintSchema);