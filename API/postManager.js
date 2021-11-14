/*
 * Author: Rajat Agarwal
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {v4 : uuidv4} = require('uuid')
const User = require('../DB/user');
const Post = require('../DB/post');
const router = express.Router();

router.post('/add', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(!err && authData.User.isAdmin != null && authData.User.isAdmin == 'true') {
            const description  = req.query.description;
            const postId = uuidv4();
            const post = {
                postId : postId,
                description : description
            }
            const postModel = new Post(post);
            postModel.save(function (err, post) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.json({
                        message : 'Post created...',
                        post : post
                    })
                }
              });
        } else {
            res.sendStatus(401);
        }
    });
});

router.post('/delete', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(!err && authData.User.isAdmin != null && authData.User.isAdmin == 'true') {
            const postId  = req.query.postId;
            Post.deleteOne({ postId : postId }, function (err, response) {
                if(err){
                    res.sendStatus(500);
                } else {
                    res.json({
                        message : 'Post deleted...',
                        postId : postId,
                        response
                    })
                }
            })
        } else {
            res.sendStatus(403);
        }
    });
});

router.post('/update', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(!err && authData.User.isAdmin != null && authData.User.isAdmin == 'true') {
            const postId  = req.query.postId;
            const description  = req.query.description;
            const post = {
                postId : postId,
                description : description
            }
            Post.findOneAndUpdate({postId: postId}, {$set: post}, function (err, updated) {
                if(err){
                    res.sendStatus(500);
                } else {
                    res.json({
                        updatedPost : post
                    })
                }
            });

            
        } else {
            res.sendStatus(403);
        }
    });
});

router.get('/view', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(!err) {
            const pageOptions = {
                page: parseInt(req.query.page, 10) || 0,
                limit: parseInt(req.query.limit, 10) || 10
            }
            Post.find().skip(pageOptions.page * pageOptions.limit).limit(pageOptions.limit)
            .exec(function (err, doc) {
                if(err) {
                    res.sendStatus(500);
                } else {
                    res.json({
                        docs : doc
                    })
                }
            });

        } else {
            res.sendStatus(403);
        }
    });
});


// Verify Token
function verifyToken(req, res, next) {
    // Get authorization header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
}

module.exports = router;