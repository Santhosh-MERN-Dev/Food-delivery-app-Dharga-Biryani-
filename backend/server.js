require('dotenv').config();
const express = require('express');
// const mongoose = require('mongoose'); 
const cors = require('cors')

const app = express();

const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')


app.use(express.json({limit: "10mb"}));
app.use(cors());


//Product Routes
app.use('/products', productRoutes)

//auth User Routes
app.use('/auth', userRoutes)

//cart Routes
app.use('/cart', cartRoutes)

//Order Router
app.use('/orders', orderRoutes)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening to ${PORT}`);
});