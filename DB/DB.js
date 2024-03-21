const mongoose = require("mongoose")
const uri = "mongodb://127.0.0.1:27017/servico"

const connectToMongo = async()=>{
    await mongoose.connect(uri).catch(err=>{
        console.log("Cannot Connect To Database")
    })
    console.log("Connection Successful")
}


module.exports = connectToMongo