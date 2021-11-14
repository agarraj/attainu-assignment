/*
 * Author: Rajat Agarwal
 */

const mongoose = require('mongoose');

const post = new mongoose.Schema({
    postId : {
        type : String,
        unique : true, 
        required : true,
    },
    description : {
        type : String,
        max: 20
    }
});

module.exports = Post = mongoose.model('post', post);
