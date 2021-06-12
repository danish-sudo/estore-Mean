const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const  AdminSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});

const Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.getUserById = function(id, callback){
    Admin.findById(id, callback);
}  
module.exports.getUserByUserName = function(username, callback){
    const query ={username:username}
    Admin.findOne(query,callback);
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