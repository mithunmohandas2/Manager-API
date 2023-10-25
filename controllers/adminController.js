const User = require('../models/userModel')

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.json({ error: 'Please provide all fields' });
        let userMatch = await User.findOne({ $and: [{ email }, { password }] });
        if (userMatch.admin) {  //if user is admin
            //JWT Token
            //Redux
            res.json({ msg: 'success' })
        }
        else return res.json({ error: 'Invalid credentials' });

    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message })
    }
}

const loadUsers = async (req, res) => {
    try {
        let users = await User.find({ admin: { $exists: false } });   //Load all users except admin
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}

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

module.exports = {
    loginAdmin,
    loadUsers,
    updateUser,
}