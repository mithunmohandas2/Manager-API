const User = require('../models/userModel')

const test = async (req,res)=>{
    res.json({response : 'Test success'})
}

const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body
        if (!email || !name || !password || !phone) {
            return res.status(404).json({ error: "Please fill all input fields" })
        }
        const emailMatch = await User.findOne({ email })
        const phoneMatch = await User.findOne({ phone })
        if (emailMatch) return res.status(404).json({ error: "Email already exists" })
        if (phoneMatch) return res.status(404).json({ error: "Phone number already exists" })

        const user = new User({ name, email, phone, password })
        const userData = await user.save();

        if (userData) res.status(200).json({ ok: 'success' })
        else return res.status(404).json({ error: 'Unable to create user' });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password){
            return res.status(404).json({ error: "Please fill all input fields" })
        }
        const user = await User.findOne({ $and: [{ email }, { password }] });
        if (user) {  //user found in database
            res.status(200).json(user)
            //JWT Token
            //Redux
        }
        else return res.status(404).json({ error: "Invalid credentials" })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

const uploadPhoto = async (req, res) => {
    try {
        console.log(req.body._id)
        console.log(req.file.filename)
        const imagePath = '/images/' + req.file.filename
        const user = await User.findOne({ _id : req.body._id });
        if(!user) {
            return res.status(404).json({ error: "User not found" })
        }// no user found in database
        const profilePicUpdate = await User.updateOne({ _id: req.body._id }, { $set: { profilePic: imagePath } });
        if (profilePicUpdate) res.status(200).json({ ok: 'success' });
        else return res.status(404).json({ error: "Unable to update profile pic" })

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