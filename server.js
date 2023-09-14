const express = require('express')
const dotenv = require('dotenv')
const connectDB =require('./config/config')
require('colors')
const morgan = require('morgan');
const path = require('path')

//config dotenv
dotenv.config()

//conncetion
connectDB()

const app = express()

//middleware
app.use(express.json())
app.use(morgan('dev'))


app.use('/api/pizzas', require('./routes/pizzaRoute'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/orders', require('./routes/orderRoute'))

//static files
app.use(express.static(path.join(__dirname, "./client/build")))
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
});


const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Sever Running on ${process.env.NODE_ENV} mode on port no ${PORT}`.bgMagenta.white)
})