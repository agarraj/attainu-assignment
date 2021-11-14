/*
 * Author: Rajat Agarwal
 */

const mongoose = require('mongoose');
const url = "mongodb+srv://dbUser:dbUserPassword@cluster0.bdaij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async() => {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("DB connected")
}

module.exports = connectDB;

