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
        await User.findByIdAndUpdate(user._id, { $set: { ...user } }, { new: true }).then((updatedUser) => {
            res.json(updatedUser)
        }).catch(err => {
            res.status(500).json({ err })
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


router.post("/placeOrder", async (req, res) => {
    const { username, customerUsername, provider } = req.body;
    if (!provider || !provider.username) {
        return res.status(400).json({ error: "Provider information missing" });
    }
    const service = { ...req.body };
    delete service.username;

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const serviceProvider = await User.findOne({ username: provider.username });
        if (!serviceProvider) {
            return res.status(404).json({ error: "Service provider not found" });
        }
        user.orderedServices.addToSet(service);
        serviceProvider.orders.addToSet({ customerUsername: customerUsername, ...service, customerProfile: user.profile });
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
        res.status(500).json({ error: error.message });
    }
})

router.post("/cancelOrder", async (req, res) => {
    await User.findOneAndUpdate(
        { "orders._id": req.body._id },
        {
            $pull: {
                orders: { _id: req.body._id }
            }
        },
        { new: true }
    ).then(async () => {
        await User.findOneAndUpdate(
            { "orderedServices._id": req.body._id },
            {
                $pull: {
                    orderedServices: { _id: req.body._id }
                }
            },
            { new: true }
        ).then((update) => {
            res.json(update)
        }).catch(err => {
            res.status(401).json(err)
        })
    }).catch(err => {
        res.status(401).json(err)
    })
})

router.post("/rescheduleAppointment", async (req, res) => {
    await User.findOneAndUpdate({"orders._id":req.body._id},{
        $set: { "orders.$.bookingDate": req.body.newDate }
    },{new:true}).then((updatedUser)=>{
        res.json(updatedUser)
    }).catch(err=>{
        res.status(300).json(err)
    })
});



router.post("/makePayment", (req, res) => {
    // Payment Gateway integration (If Possible)
})


router.post("/reportServices", (req, res) => {
    // Code For Reporting Fake Services and Scammers
})


router.post("/giveReviews", (req, res) => {
    // Code to add Reviews to the Services
})


module.exports = router