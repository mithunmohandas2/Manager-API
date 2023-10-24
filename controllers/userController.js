const User = require('../models/userModel')

const registerUser = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, phone, password } = req.body
        if (!email || !name || !password || !phone) throw Error('Missing details')
        const emailMatch = await User.findOne({ email })
        const phoneMatch = await User.findOne({ phone })
        if (emailMatch) res.json({ msg: "Email already exists" })
        if (phoneMatch) res.json({ msg: "Phone number already exists" })
        
        const user = new User({ name, email, phone, password })
        // const userData = await user.save();
        const userData = user

        if (userData) res.json(ok)
        else throw Error('Unable to create user')
    } catch (error) {
        console.log(error.message)
        res.json({ msg: error.message })
    }
}

const loginUser = async (req,res)=>{
    try {
        const { email, password } = req.body;
        if(!email||!password)throw Error("Details missing");
        const user=await User.findOne({email});
        if(!user)throw Error("Invalid credentials")
        if(user){
            res.json(user)
        }
        
    } catch (error) {
        console.log(error.message)
        res.json({ msg: error.message })
    }
}

module.exports = {
    registerUser,
    loginUser,
}