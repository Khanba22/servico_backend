const router = require('express').Router()
const User = require("../Models/User")

router.post("/", (req, res) => {
    // Extract user data from req.body
    const userData = req.body;
    console.log(userData)
    // Create a new user
    const newUser = new User({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        profile: {
            firstName: userData.profile.firstName,
            lastName: userData.profile.lastName,
            phoneNumber: userData.profile.phoneNumber,
            address: userData.profile.address,
            servicesProvided: userData.profile.servicesProvided || [], // Default to empty array if not provided
            bio: userData.profile.bio || '', // Default to empty string if not provided
            ratings: { totalRatings: 0, averageRating: 0 }, // Initial ratings for new users
            availability: userData.profile.availability || {} // Default to empty object if not provided
        },
        orderedServices: [], // Empty array for new users
    });

    // Save the new user to the database
    newUser.save()
        .then(savedUser => {
            res.status(201).json(savedUser); // Respond with the created user
        })
        .catch(error => {
            console.error('Error saving user:', error);
            res.status(500).json({ error: 'Internal server error' }); // Respond with an error status
        });
})


module.exports = router