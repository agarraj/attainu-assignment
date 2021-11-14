/*
 * Author: Rajat Agarwal
 */

const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./DB/dbConn.js');
//connect DB
connectDB();

// express app
const app = express();

//login End point
const login = require('./API/login');
app.use('/api/login', login);

//post manager end point
const post = require('./API/postManager');
app.use('/api/posts', post);

app.listen(5000, () => console.log("Server started on port 5000"))

module.exports = app;