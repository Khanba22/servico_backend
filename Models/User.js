const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
});

const ratingsSchema = new Schema({
    totalRatings: Number,
    averageRating: Number
});

const availabilitySchema = new Schema({
    start: String,
    end: String
});

const paymentSchema = new Schema({
    totalAmount: Number,
    paymentStatus: String
});


const serviceListSchema = {
    serviceName: String,
    description: String,
    category: String,
    bookingDate: Date,
    status: String,
    payment: {
        totalAmount: Number,
        paymentStatus: String
    },
    customerUsername:String,
    customerProfile: {
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
    },
}

const orderedServiceSchema = {
    serviceName: String,
    description: String,
    category: String,
    provider: {
        username: {
            type: String,
        },
        email: {
            type: String,
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
    bookingDate: Date,
    status: String,
    payment: {
        totalAmount: Number,
        paymentStatus: String
    }
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: String,
    profile: {
        firstName: String,
        lastName: String,
        phoneNumber: String,
        address: addressSchema,
        servicesProvided: [{
            serviceName: String,
            description: String,
            category: String,
        }],
        bio: String,
        ratings: ratingsSchema,
        availability: availabilitySchema
    },
    orders:[serviceListSchema],
    orderedServices: [orderedServiceSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
