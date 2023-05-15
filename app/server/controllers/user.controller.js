const User = require('../models/user.model');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { json } = require('express');

module.exports = {
    registerUser: async (req, res) => {
        try{
            const potentialUser = await User.findOne({email: req.body.email})
            if(potentialUser){
                res.status(400).json({ message: 'User with that email already exists' })
            }
            else{
                const newUser = await User.create(req.body);

                const userToken = jwt.sign({_id: newUser._id, email: newUser.email}, secret, {expiresIn:'2h'})
                res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2 * 60 * 60 * 1000}).json(newUser);
            }
        }
        catch(err){
            res.status(400).json(err)
        }
    },

    loginUser: async (req, res) => {
        try{
            const user = await User.findOne({email: req.body.email})
            if(user){
                const passwordMatch = await bcrypt.compare(req.body.password, user.password)
                if (passwordMatch){
                    const userToken = jwt.sign({_id: user._id, email: user.email}, secret, {expiresIn:'2h'})
                    res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2 * 60 * 60 * 1000}).json(user);
                }
                else{
                    res.status(400).json({ message: 'Invalid email or password'})
                }
            }
            else{
                res.status(400).json({ message: 'Invalid email or password' })
            }
        }
        catch{
            res.status(400).json(err)
        }
    },

    logoutUser: (req, res) => {
        res.clearCookie('userToken').json({message: 'You logged out'})
    }
}