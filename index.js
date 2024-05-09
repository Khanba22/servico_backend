const express = require("express")
const PORT = process.env.PORT || 4000
const connectToMongo = require("./DB/DB")
const app = express()
connectToMongo()
app.use(express.json())
const cors = require("cors")
app.use(cors())

// Routes
app.use("/register",require("./Routes/createAccount"))
app.use("/login",require("./Routes/login"))
app.use("/user",require("./Routes/userFuntions"))
app.use("/services",require("./Routes/services"))


app.listen(PORT , ()=>{
    console.log("Server Active")
})