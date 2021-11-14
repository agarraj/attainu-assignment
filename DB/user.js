/*
 * Author: Rajat Agarwal
 */

const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username : {
        type : String
    },
    password : {
        type : String
    },
    isAdmin : {
        type : Boolean,
        default: null
    }
});
module.exports = User = mongoose.model('user', user);
