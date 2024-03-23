const express = require("express")
const router = express.Router()
const User = require("../Models/User")
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

router.post("/updateDetails", async (req, res) => {
    const user = req.body.user;
    try {
        await User.findByIdAndUpdate(user._id,{$set:{...user}},{new:true}).then((updatedUser)=>{
            res.json(updatedUser)
        }).catch(err=>{
            res.status(500).json({err})
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
})


router.post("/placeOrder", async (req, res) => {
    const { username, customerUsername, provider } = req.body;

    // Check if provider exists in the request body
    if (!provider || !provider.username) {
        return res.status(400).json({ error: "Provider information missing" });
    }
    // Create a copy of req.body excluding username
    const service = { ...req.body };
    delete service.username;

    try {
        // Find the user who ordered the service
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find the service provider
        const serviceProvider = await User.findOne({ username: provider.username });
        if (!serviceProvider) {
            return res.status(404).json({ error: "Service provider not found" });
        }

        // Add service to user's ordered services
        user.orderedServices.addToSet(service);

        // Add order to service provider's orders
        serviceProvider.orders.addToSet({ customerUsername: customerUsername, ...service, customerProfile: user.profile });

        // Save both user and service provider
        await serviceProvider.save().then(async () => {
            await user.save().then((userData) => {
                res.status(201).json(userData)
            }).catch(err => {
                res.status(301).json({ err: err })
            })
        }).catch(err => {
            res.status(301).json({ err: err })
        })
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
})

router.post("/cancelOrder", (req, res) => {
    
})

router.post("/rescheduleAppointment", async (req, res) => {
    try {
        const { orderId, newBookingDate } = req.body;
        // Update booking date of ordered service
        const update = await OrderedService.updateOne({ _id: orderId }, { $set: { bookingDate: newBookingDate } }, { new: true });
        res.status(200).json(update);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

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