const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/checkAuth');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
    cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null,  new Date().toISOString().replace(/:/g, '-') +  file.originalname );
    }
})

const upload = multer({storage: storage, limits:{
    fileSize: 1024*1024 * 5
}})

//Handling Incoming GET routes to retrieve all products
router.get('/', (req, res, next) => {
    Product.find()
    .select('productname price dateCreated _id request quantity productimage description ')
    .exec()
    .then(docs =>{
        console.log(docs);
        const response = {
            count: docs.length,
            products: docs.map(doc =>{
                return {
                    productname : doc.productname,
                    price: doc.price,
                    quantity:doc.quantity,
                    dateCreated: doc.dateCreated,
                    productimage: doc.productimage,
                    description: doc.description,
                    _id: doc._id,
                    request : {
                        type : "GET",
                        url : "https://productshopapi.herokuapp.com/products"+ doc._id
                    }

                }
            })
        }
        res.status(200).json({
            message: "Handling GET request to /products",
            createdProduct: response

        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
    
});

router.post('/', upload.single('productimage') ,(req, res, next) => {
    console.log(req.file);
   const product = new Product({
       _id: new  mongoose.Types.ObjectId(),
       productname: req.body.productname,
       price: req.body.price,
       quantity: req.body.quantity,
       dateCreated: req.body.dateCreated,
       productimage: req.file.path,
       description: req.body.description

   });
   product
   .save()
   .then(result => {
       console.log(result);

   })
   .catch(err => {
    console.log(err)
   });

   res.status(201).json({
    message: "Handling POST route to /products",
    createdProduct: product
});
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById({_id:id})
    .exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json({
            product: docs
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        });
    });
});

router.patch('/:productId', (req, res, next) => {
    
   Product.findByIdAndUpdate(req.params.productId, req.body,{new: true},)
   .then(result =>{
       res.status(200).json({
           result:result
       })
   })
   .catch(err =>{
       res.status(500).json({
           messageError:err
       })
   })
});


router.delete('/:productId', (req, res, next) => {
const id = req.params.productId;

Product.remove({_id:id})
.exec()
.then(result =>{
    res.status(200).json(result)
})
.catch( err =>{
    res.status(500).json({
        errorMessage: err
    })
})

});
module.exports = router;