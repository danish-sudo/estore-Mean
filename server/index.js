const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport')
const mongoose = require('mongoose')
const port = 3000;
const app= express();

const config = require('./config/database')

mongoose.connect(config.database,{useUnifiedTopology:true, useNewUrlParser:true})
.then(
    ()=>{console.log('DB connected')},
    err =>{console.log('DB not connected')}
);
const users = require('./routes/users')
const admin = require('./routes/admin')
const products = require('./routes/products')
const orders = require('./routes/orders')

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.use('/users', users);
app.use('/products',products);
app.use('/admin',admin);
app.use('/orders',orders);

app.get('/',(req,res)=>{
    res.send('Invalid endpoint')
})

app.listen(port ,()=>{
    console.log('Server started on port'+ port);
})
