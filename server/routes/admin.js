const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Admin = require("../models/admin")

const config = require('../config/database');
router.post('/register', (req,res,next)=>{
    let newUser = new Admin({
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    });
    Admin.addUser(newUser, (err,user)=>{
        if(err){
            res.json({success:false, msg:"Failed to register user"})
        }else{
            res.json({success:true, msg:"User Registered"})
        }
    })
})
router.post('/auth', (req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    Admin.getUserByUserName(username,(err, user)=>{
        if(err) throw err
        if(!user){
            return  res.json({success:false, msg:"User Not Found"});
        }
       
        Admin.comparePassword(password, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(),config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success:true,
                    token:'JWT'+token,
                    user:{
                        id:user._id,
                        name:user.name,
                        username:user.username,
                        email:user.email
                    }
                })
            }else{
                return  res.json({success:false, msg:"Wrong Password"});
            }
        })
    })
})

router.get('/profile',(req,res,next)=>{
    res.json({admin: req.user});
})

module.exports = router;    