const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        phoneNumber: String,
        message: String,
        date: String,
    }
)

module.exports = mongoose.model("Message",messageSchema)