const router = require("express").Router();
const Service = require("../Models/Service");
const User= require("../Models/User");


router.get("/getOrders", async (req, res) => {
    const user = await User.findById(req.body._id)
    if (!user) {
        res.status(404).json({ err: "User Not Found" })
    }
    res.json({ orders: user.orders, count: user.orders.length })
});

router.post("/completeOrders", async (req, res) => {
    await User.findOneAndUpdate(
        { "orders._id": req.body._id },
        { $set: { "orders.$.status": "Complete" } },
        { new: true }
    ).then(async(update) => {
        await User.findOneAndUpdate(
            { "orderedServices._id": req.body._id },
            { $set: { "orderedServices.$.status": "Complete" } },
            { new: true }
        ).then((update) => {
            res.json(update)
        }).catch(err => {
            res.status(401).json(err)
        })
    }).catch(err => {
        res.status(401).json(err)
    })

    

});


router.post("/updateDetails", (req, res) => {
    const service = req.body;
    Service.findOneAndUpdate({ serviceName: service.serviceName, "provider.username": service.provider.username }, { service }, { new: true }).then((data) => {
        User.findOne({ username: service.provider.username })
            .then((user) => {
                if (!user) {
                    res.status(301).json({ err: "user not found" })
                    return;
                }
                // Find the index of the service to be removed in the servicesProvided array
                const indexToRemove = user.profile.servicesProvided.findIndex(service => service.serviceName === service.serviceName);
                // Check if the service exists in the user's servicesProvided array
                if (indexToRemove === -1) {
                    res.status(301).json({ err: "Service Not Found" });
                    return;
                }

                // Remove the service from the servicesProvided array
                user.profile.servicesProvided.splice(indexToRemove, 1);
                user.profile.servicesProvided.push({ ...indexToRemove, ...service });

                // Save the updated user object
                user.save()
                    .then((updatedUser) => {
                        res.status(201).json(updatedUser);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(301).json({ error });
                    });
            })
            .catch((error) => {
                console.log(error);
                res.status(301).json({ error: "Hello" });
            });
    }).catch(err => {
        res.status(301).json({ err: "Error" });
    })
});


router.post("/addService", async (req, res) => {
    const body = req.body
    const service = new Service({
        ...body
    })

    await service.save().then(service => {
        const username = body.provider.username; // Change this to the username of the user
        User.findOne({ username })
            .then((user) => {
                if (!user) {
                    console.log('User not found');
                    return;
                }

                user.profile.servicesProvided.push(service);

                // Save the updated user object
                user.save()
                    .then((updatedUser) => {
                        res.status(201).json({ updatedUser })
                    })
                    .catch((error) => {
                        res.status(301).json({
                            ...error
                        })
                    });
            })
            .catch((error) => {
                res.status(301).json({
                    ...error
                })
            });
    })
        .catch((error) => {
            res.status(301).json({
                ...error
            })
        })
});

router.post("/removeService", (req, res) => {
    const service = req.body;
    Service.deleteOne({ serviceName: service.serviceName, "provider.username": service.provider.username }).then((data) => {
        User.findOne({ username: service.provider.username })
            .then((user) => {
                if (!user) {
                    res.status(301).json({ err: "user not found" })
                    return;
                }

                // Find the index of the service to be removed in the servicesProvided array
                const indexToRemove = user.profile.servicesProvided.findIndex(service => service.serviceName === service.serviceName);

                // Check if the service exists in the user's servicesProvided array
                if (indexToRemove === -1) {
                    res.status(301).json({ err: "Service Not Found" });
                    return;
                }

                // Remove the service from the servicesProvided array
                user.profile.servicesProvided.splice(indexToRemove, 1);

                // Save the updated user object
                user.save()
                    .then((updatedUser) => {
                        res.json(updatedUser);
                    })
                    .catch((error) => {
                        res.status(301).json({ error });
                    });
            })
            .catch((error) => {
                res.status(301).json({ error });
            });
    }).catch(err => {
        res.status(301).json({ err });
    })
});


module.exports = router