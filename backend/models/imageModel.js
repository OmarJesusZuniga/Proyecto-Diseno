const mongoose = require('mongoose');

const Schema = mongoose.Schema

const imageSchema = new Schema({
    img: {
        type: String,
        required: true
    },
}, {timestamps:true});
 
module.exports = mongoose.model('image', imageSchema);