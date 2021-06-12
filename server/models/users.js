const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const  userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    products: {
        type: Array,
    },
    orders:{
        type:Array,
    },
    userImage:{
        type:String
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}  
module.exports.getUserByUserName = function(username, callback){
    const query ={username:username}
    User.findOne(query,callback);
}
module.exports.getUserByEmail = function(email, callback){
    const query ={email:email}
    User.findOne(query,callback);
}

module.exports.addUser =function(newUser,callback){
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt,(err,hash)=>{
            if(err){throw err}
            newUser.password = hash;
            newUser.save(callback)
        });
    });
}
module.exports.comparePassword = function(candidatepassword, hash, callback){
    bcrypt.compare(candidatepassword,hash,(err, isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    })
}