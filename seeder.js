const mogoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");
const connectDb = require("./config/config");
const Pizza = require("./models/pizzaModel");
const Pizzas = require("./data/pizza-data");

//CONFIG DOT ENV AND mongodb con file
dotenv.config()
connectDb()

//import Data
const importData = async() =>{
    try {
        await Pizza.deleteMany()
        const sampleData = Pizzas.map(pizza =>{return{...pizza}})
        await Pizza.insertMany(sampleData)
        console.log('DATA imported'.bgGreen.white)
    } catch (error) {
        console.log(`${error}`.bgRed.white)
        process.exit(1)
    }
}
const dataDestroy = () => {};

if (process.argv[2] === "-d") {
  dataDestroy();
} else {
  importData();
}