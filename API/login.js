/*
 * Author: Rajat Agarwal
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../DB/user');
const router = express.Router();

router.post('/', (req, res) => {
    const username  = req.query.username;
    const password = req.query.password;
    const isAdmin = req.query.isAdmin;

    if(username != null && password != null){
        const user = {
            username : username,
            password : password,
            isAdmin : isAdmin
        }
        
        let userModel = new User(user);
        
        jwt.sign({User: user}, 'secretKey', (err, token) => {
            if(err) {
                res.sendStatus(403);
            } else {
                userModel.save(function (err, response) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.json({
                            message : 'User logged in...',
                            token : token,
                            response
                        })
                    }
                  });
            }
        })
      } else {
        res.sendStatus(403);
      }
});

module.exports = router;