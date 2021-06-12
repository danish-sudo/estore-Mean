const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/users")
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'C:\\nginx-1.18.0\\html\\images')
    },
    filename: (req, file, callBack) => {
        callBack(null, `User_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })
router.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file);
})

router.post('/multipleFiles', upload.array('files'), (req, res, next) => {
    const files = req.files;
    console.log(files);
    if (!files) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send({sttus:  'ok'});
})
const config = require('../config/database');
router.post('/register', (req,res,next)=>{
    let newUser = new User({
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        products:req.body.products,
        orders:req.body.cart,
        userImage: req.body.userImage
    });

    User.addUser(newUser, (err,user)=>{
        if(err){
            res.json({success:false, msg:"Failed to register user"})
        }else{
            res.json({success:true,msg:"nice"})
        }
    })
});
router.route('/get/:id').get(function(req,res){
    let id=req.params.id;
    User.findById(id,function (err,user){
        res.json(user);
    });
});
router.route('/update/:id').post(function(req,res){
    User.findById(req.params.id,function(err,user){
        if(!user)
            res.status(404).send("Record not found");
        else{
            user.products=req.body.products;
            user.save().then(user =>{
                res.json('Update complete');
            })
                .catch(err=>{
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

router.route('/etname/:id').post(function(req,res){
    User.findById(req.params.id,function(err,user){
        if(!user)
            res.status(404).send("Record not found");
        else{
            user.name=req.body.name;
            user.userImage =req.body.userImage;
            user.save().then(user =>{
                res.json('Update complete');
            })
                .catch(err=>{
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

router.route('/orders/:id').post(function(req,res){
    User.findById(req.params.id,function(err,user){
        if(!user)
            res.status(404).send("Record not found");
        else{
            user.orders=req.body.orders;
            user.save().then(user =>{
                res.json('Update complete');
            })
                .catch(err=>{
                    res.status(400).send("unable to update the database");
                });
        }
    });
});


router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});
router.post('/check_email',(req,res,next)=>{
    const email = req.body.email;
    const username= req.body.username;
    User.getUserByEmail(email, (err,email)=> {
        if (err) throw err
        if (email) {
            return res.json({success: false, msg: "Email Already Exists"});
        }
        User.getUserByUserName(username, (err, username) => {
            if (err) throw err
            if (username) {
                return res.json({success: false, msg: "Username Already Exists"});
            }
            else{
                return res.json({success: true, msg: ""});
            }
        })
    })
});
router.route('/getAll').get(function (req,res){
    User.find(function (err,users){
        if(err){
            console.log(err);
        }
        else{
            res.json(users);
        }
    });
});

router.post('/auth', (req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUserName(username,(err, user)=>{
        if(err) throw err
        if(!user){
            return  res.json({success:false, msg:"User Not Found"});
        }
       
        User.comparePassword(password, user.password, (err, isMatch)=>{
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
                        email:user.email,
                        products:user.products,
                        orders:user.orders,
                        userImage:user.userImage
                    }
                })
            }else{
                return  res.json({success:false, msg:"Wrong Password"});
            }
        })
    })
})
router.route('/delete/:id').get(function(req,res){
    User.findByIdAndRemove({ _id:req.params.id},function(err,user){
        if(err) res.json(err);
        else res.json('successfully removed');
    });
});

module.exports = router;    