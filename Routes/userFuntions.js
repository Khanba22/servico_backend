const express = require("express")
const router = express.Router()
const Service = require("../Models/Service")

router.get("/getServicesByName", (req, res) => {
    Service.find({ serviceName: new RegExp(req.body.serviceName, 'i') })
        .then(services => {
            res.status(201).json(services)
        })
        .catch(error => {
            console.error("Error finding services:", error);
        })
})

router.get("/getServicesByCategory", (req, res) => {
    Service.find({ category: new RegExp(req.body.category, 'i') })
        .then(services => {
            res.status(201).json(services)
        })
        .catch(error => {
            console.error("Error finding services:", error);
        })
})

router.post("/updateDetails", (req, res) => {
    // Code for changing User profile details
})


router.post("/placeOrder", (req, res) => {
    // Code For Placing Order
})

router.post("/cancelOrder", (req, res) => {
    // Code to Cancel Orders
})

router.post("/rescheduleAppointMent", (req, res) => {

})

router.post("/verifyCompletion", (req, res) => {
    // Code To Verify Completion Of services
})

router.post("/makePayment", (req, res) => {
    // Payment Gateway integration (If Possible)
})

router.get("/getServiceProviders", (req, res) => {
    // Gets All Service Providers
})

router.post("/reportServices", (req, res) => {
    // Code For Reporting Fake Services and Scammers
})


router.post("/giveReviews", (req, res) => {
    // Code to add Reviews to the Services
})


module.exports = router