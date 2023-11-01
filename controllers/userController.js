const User = require('../models/userModel');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');

const test = async (req, res) => {
    res.json({ response: 'Test success' })
}

//Register User - Signup
const registerUser = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, phone, password } = req.body
        const admin = req.body.admin ? req.body.admin : false
        if (!email || !name || !password || !phone) {
            return res.json({ error: "Please fill all input fields" })
        }
        const emailMatch = await User.findOne({ email })
        const phoneMatch = await User.findOne({ phone })
        if (emailMatch) return res.json({ error: "Email already exists" })
        if (phoneMatch) return res.json({ error: "Phone number already exists" })

        const user = new User({ name, email, phone, password, admin })
        const userData = await user.save();

        if (userData) res.status(200).json({ ok: 'success' })
        else return res.json({ error: 'Unable to create user' });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

//Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ error: "Please fill all input fields" })
        }
        const user = await User.findOne({ $and: [{ email: email }, { password: password }] });
        if (user) {  //user found in database
            const tokenData = await createToken(user._id)   // generating JWT Token
            const userData = {                              // Token data + User Data
                token: tokenData,
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                admin: user.admin,
                profilePic: user.profilePic,
            }

            res.status(200).json(userData)
            //Reduxto be done
        }
        else throw Error("Invalid credentials")

    } catch (error) {
        console.log(error.message)
        res.json({ error: error.message })
    }
}

//create JWT Token
const createToken = async (id) => {
    try {
        return await jwt.sign({ _id: id }, process.env.secretJWT, { expiresIn: '24h' });
    } catch (error) {
        return error.message;
    }
}

//Upload User Profile Picture
const uploadPhoto = async (req, res) => {
    try {
        console.log(req.body._id)
        console.log(req.file.filename)
        const imagePath = '/images/' + req.file.filename
        const user = await User.findOne({ _id: req.body._id });
        if (!user) {
            return res.json({ error: "User not found" })
        }// no user found in database
        const profilePicUpdate = await User.updateOne({ _id: req.body._id }, { $set: { profilePic: imagePath } });
        if (profilePicUpdate) res.status(200).json({ ok: 'success' });
        else return res.json({ error: "Unable to update profile pic" })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}


module.exports = {
    test,
    registerUser,
    loginUser,
    uploadPhoto,
}