

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Product = new Schema({
    Code: {
        type: String
    },
    ProductName: {
        type: String
    },
    ProductCat: {
        type: Array
    },
    ProductDis: {
        type: String
    },
    ProductPrice: {
        type: Number
    },
    ProductQuantity: {
        type: Number
    },
    AddedBy: {
        type: String
    },
    DateAdded: {
        type: String
    },
    ImagePath:{
        type:String
    },
    ImagePath2:{
        type:String
    },
    Size: {
        type: Array
    },
    Color: {
        type: Array
    },
    Manufacturer: {
        type: String
    },
},
{
    collection: 'Products'
});
product = module.exports = mongoose.model('Products', Product);
module.exports.getByCode = function(Code, callback){
    const query ={Code:Code}
    product.findOne(query,callback);
}