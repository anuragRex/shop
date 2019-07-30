const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res, next) => {
    User.find({ email : req.body.email })
        .then(users => {
            if(users.length < 1){
                return res.status(401).json({
                    error : 'either email or password is wrong'        
                });        
            }
            bcrypt.compare(req.body.password, users[0].password, async (err, result)=>{
                if(err){
                    return res.status(401).json({
                        error : 'Auth failed'        
                    });        
                }
                if(result){
                    const token = await jwt.sign({
                                    email : users[0].email,
                                    id : users[0]._id,
                                }, 
                                process.env.JWT_PRIVATE_KEY,
                                {
                                    expiresIn : "1h"
                                });
                    return res.status(200).json({
                        message : 'login success',
                        token
                    });
                }
                // If password does not match
                res.status(401).json({
                    error : 'either email or password is wrong'        
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message : "something went wrong",
                error : `${err.name} : ${err.message}`
            });
        });
        
});

router.post('/signup', async (req, res, next)=> {
    const userExists = await User.find({ email : req.body.email });
    if(userExists){
        return res.status(409).json({
            error : 'user exists already'        
        });
    }

    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
            return res.status(500).json({
                error : `${err.name} : ${err.message}`
            });
        }

        const user = new User({
            _id : new mongoose.Types.ObjectId(),
            email : req.body.email,
            password : hash
        });
        user.save()
            .then(result => {
                res.status(201).json({
                    message : 'user created succcessfully',
                    user : result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message : "something went wrong",
                    error : `${err.name} : ${err.message}`
                });
            });
    });
});


module.exports = router;