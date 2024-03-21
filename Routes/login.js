const router = require('express').Router()
const User = require("../Models/User")

router.post("/auth",async(req,res)=>{
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

  
      // Respond with user details
      res.json({ user });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
})

router.post("/",async(req,res)=>{
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check password
      const isPasswordMatch = password === user.password;
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Respond with user details
      res.json({ user });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
})


module.exports = router