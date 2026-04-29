const mongoose = require('mongoose');

// User Database
const userDB = mongoose.createConnection('mongodb://localhost:27017/user')
userDB.on('connected', ()=> {
    console.log('user DB Connected')
})
userDB.on('error', (error)=> {
    console.log(error)
})

//Products Database
const productDB = mongoose.createConnection('mongodb://localhost:27017/products')
productDB.on('connected', ()=> {
    console.log('product DB Connected')
})
productDB.on('error', (error)=> {
    console.log(error)
})

//orders Database
const orderDB = mongoose.createConnection('mongodb://localhost:27017/orders')
orderDB.on('connected', ()=> {
    console.log('order DB Connected')
})
orderDB.on('error', (error) => {
    console.log(error)
})

//cart Database
const cartDB = mongoose.createConnection('mongodb://localhost:27017/cartdb')
cartDB.on('connected', ()=> {
    console.log('Cart DB Connected')
})
cartDB.on('error', (error) => {
    console.log(error)
})


module.exports = {userDB, productDB, orderDB, cartDB}