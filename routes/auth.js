const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()

const jwtSecret = process.env.JWT_SECRET;


const router = express.Router();

//Regsistration 
router.post('/registration', async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = new User({username, password}); // should match scheme fields
        await user.save();
        res.status(201).send("User is registered");
    } catch (error) {
        res.json({ success: false, message: error.message})
    }
});

//Login 

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send('Invalid Credentials');
        }
        const token = jwt.sign({id: user._id}, jwtSecret, { expiresIn: '1h' });
        res.json({token})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;
