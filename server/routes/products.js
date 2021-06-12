const express=require('express');
const app=express();
const productRoutes=express.Router();

//Require Member model in our routes module
let Product=require('../models/products');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'C:\\nginx-1.18.0\\html\\images')
    },
    filename: (req, file, callBack) => {
        callBack(null, `Products_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })
productRoutes.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file);
})

//Defined store route
productRoutes.route('/add').post(function(req,res){
    let product=new Product(req.body);

    product.save()
    .then(product =>{
        res.status(200).json({product:'Product has been added successfully'})
    })
    .catch(err=>{
        res.status(400).send("unable to save to database");
      });
});

//Defined get data(index or listening) route
productRoutes.route('/').get(function (req,res){
    Product.find(function (err,products){
        if(err){
            console.log(err);
        }
        else{
            res.json(products);
        }
    });
});
productRoutes.route('/quantity/:id').get(function (req,res) {
    let Code = req.params.id;
    Product.getByCode(Code,function (err,product) {
        res.json(product.ProductQuantity);
    })
});

productRoutes.route('/edit/:id').get(function(req,res){
    let id=req.params.id;
    Product.findById(id,function (err,product){
        res.json(product);
    });
});



productRoutes.route('/update/:id').post(function(req,res){
    Product.findById(req.params.id,function(err,product){
        if(!product)
            res.status(404).send("Record not found");
        else{
            product.ProductName=req.body.ProductName;
            product.ProductDis=req.body.ProductDis;
            product.ProductPrice=req.body.ProductPrice;
            product.ProductQuantity=req.body.ProductQuantity;
            product.AddedBy = req.body.AddedBy;
            product.DateAdded = req.body.DateAdded;
            product.save().then(product =>{
                res.json('Update complete');
            })
                .catch(err=>{
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

productRoutes.route('/updateQuantity/:id').post(function(req,res){
    Product.getByCode(req.params.id,function(err,product){
        if(!product)
            res.status(404).send("Record not found");
        else{
            product.ProductQuantity=req.body.ProductQuantity;
            product.save().then(product =>{
                res.json('Update complete');
            })
                .catch(err=>{
                    res.status(400).send("unable to update the database");
                });
        }
    });
});
productRoutes.route('/delete/:id').get(function(req,res){
    Product.findByIdAndRemove({ _id:req.params.id},function(err,product){
        if(err) res.json(err);
        else res.json('successfully removed');
    });
});

module.exports=productRoutes;