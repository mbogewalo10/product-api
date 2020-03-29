const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config()


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user')

const dbUrl ="mongodb://mboge:niamina1@ds013891.mlab.com:13891/heroku_m3x9w2cs";
// const dbUrl2 = "mongodb+srv://assan:"+process.env.mongo_pass+"@product-api-uust1.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect( process.env.MONGODB_URI || dbUrl, {useCreateIndex: true, useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;

db.once("open", _=> {
    console.log("Connected successfully to mongodb database on " + dbUrl);
})

db.on("error", err =>{
    console.error("Connection Error" + err);
})



app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'))
app.use(express.static(path.join(__dirname, "shop-frontend", "build")));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {           
    app.use(express.static('shop-frontend/build'));
  }

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Requested-With, Authorization, Origin');

    if(req.method === 'OPTIONS'){
        res.header('Access-control-Allow-Methods', 'PUT, PATCH, DELETE, GET, POST');
        return res.status(200).json({});
    }
    next();
});


app.use('/products', productRoutes);
app.use('/orders',  orderRoutes);
app.use('/user', userRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;