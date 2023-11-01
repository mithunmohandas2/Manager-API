const User = require('../models/userModel')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');

// .................Login Admin.........................

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.json({ error: 'Please provide all fields' });
        let userMatch = await User.findOne({ $and: [{ email }, { password }] });
        if (!userMatch) return res.json({ error: 'Invalid credentials' });                             //no user found
        if (!userMatch.admin === true) return res.json({ error: 'User without admin previlages' });    //User but not admin
        //if user is admin
        const tokenData = await createToken(userMatch._id)   // generating JWT Token
        const adminData = {                              // Token data + User Data
            token: tokenData,
            _id: userMatch._id,
            name: userMatch.name,
            email: userMatch.email,
            phone: userMatch.phone,
            admin: userMatch.admin
        }
        res.status(200).json(adminData)
        //Redux to be done

    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message })
    }
}

//create JWT Token
const createToken = async (id) => {
    try {
        return await jwt.sign({ _id: id }, process.env.secretJWT, { expiresIn: '24h' });
    } catch (error) {
        return error.message
    }
}

// ................Load all user's data........................

const loadUsers = async (req, res) => {
    try {
        let users = await User.find();   //Load all users except admin
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}

// .................Update User Data.........................

const updateUser = async (req, res) => {
    try {
        const { _id } = req.params        // Get the user ID from the URL parameter
        const updatedData = req.body    //form data recieved

        let users = await User.findByIdAndUpdate(_id, updatedData, { new: true });
        if (!users) return res.json({ error: 'User not found' });

        res.status(200).json(users)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}

// .................Search Users.........................

const userSearch = async (req, res) => {
    try {
        const startLetter = req.body.searchData
        const regex = new RegExp(`^${startLetter}`, 'i');
        const users = await User.find({ name: { $regex: regex } });   //find user with starting letter
        res.status(200).json(users)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}

// -----------------delete User-------------------------

const deleteUser = async (req, res) => {
    try {
        console.log(req.body._id)
        const users = await User.findByIdAndDelete({ _id: req.body._id });
        res.status(200).json(users)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}

// ------------------------------------------------------------

module.exports = {
    loginAdmin,
    loadUsers,
    updateUser,
    userSearch,
    deleteUser,
}