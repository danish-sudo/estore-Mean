const mongoose = require('mongoose');

const  Orders = mongoose.Schema({
    TrackingID: {
        type: String
    },
    CustomerName:{
        type:String
    },
    CustomerEmail:{
        type:String
    },
    CustomerPhone:{
        type:String
    },
        orderDate:{
        type:String
    },
    ShippingAddress:{
        type:String
    },
    products: {
        type: Array,
    },
        orderStatus:{
        type:String
    },
    Total:{
        type: Number
    }
    },
{
    collection: 'Orders'
});

const order = module.exports=mongoose.model('Orders', Orders)
module.exports.getTracking = function(TrackingID, callback){
    const query ={TrackingID:TrackingID}
    order.findOne(query,callback);
}