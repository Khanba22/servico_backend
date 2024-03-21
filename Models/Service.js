const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    serviceName: String,
    description: String,
    category: String,
    provider:{
        username: {
            type:String,
            required:true
          },
          email: {
            type:String,
            required:true,
          },
          profile: {
            firstName: String,
            lastName: String,
            phoneNumber: String,
            address: {
                street: String,
                city: String,
                state: String,
                zipCode: String,
                country: String
              },
            servicesProvided: [{
              serviceName: String,
              description: String,
              category: String,
            }],
            bio: String,
            ratings: {
                totalRatings: Number,
                averageRating: Number
              },
            availability: {
                start: String,
                end: String
              }
          },
    },  
  })

module.exports = mongoose.model("Service",ServiceSchema)