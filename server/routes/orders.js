const express=require('express');
const router=express.Router();

//Require Member model in our routes module
let Order=require('../models/orders');

//Defined store route
router.route('/add').post(function(req,res){
    let order=new Order(req.body);
    order.save()
        .then(order =>{
            res.send(order);
        })
        .catch(err=>{
            res.status(400).send("unable to save to database");
        });
});

router.route('/').get(function (req,res){
    Order.find(function (err,orders){
        if(err){
            console.log(err);
        }
        else{
            res.json(orders);
        }
    });
});
router.route('/tracking/:id').get(function(req,res){
    let TrackingID=req.params.id;
    Order.getTracking(TrackingID,(err, order)=>{
        if(err) throw err
        if(!order){
            return  res.json({success:false, msg:"Order Not Found"});
        }
        else {
        res.send(order);
        }
    });
    });

router.route('/view/:id').get(function(req,res){
    let id=req.params.id;
    Order.findById(id,function (err,order){
        res.json(order);
    });
});

//Defined update route
router.route('/update/:id').post(function(req,res){
    Order.findById(req.params.id,function(err,order){
        if(!order)
            res.status(404).send("Record not found");
        else{
            order.orderStatus = req.body.orderStatus;
            order.save().then(order =>{
                res.json('Update complete');
            })
                .catch(err=>{
                    res.status(400).send("unable to update the database");
                });
        }
    });
});
router.route('/delete/:id').get(function(req,res){
    Order.findByIdAndRemove({ _id:req.params.id},function(err,order){
        if(err) res.json(err);
        else res.json('successfully');
    });
});

module.exports=router;