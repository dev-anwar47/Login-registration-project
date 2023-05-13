const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require("../Models/user-model");
const jwt = require('jsonwebtoken');
const auth = require("../Middleware/auth");


router.post("/register", async (req, res) => {
    try {
        const { email, password, checkpassword } = req.body;
        if (!email || !password || !checkpassword) {
            return res.json({
                message: "All filed are required"
            });
        }
        if (password.length < 5) {
            return res.json({
                message: "password must be more than 5 character "
            });
        }
        if (password !== checkpassword) {
            return res.json({
                message: "password must be same"
            });
        }
        const existUser = await User.findOne({ email: email });
        if (existUser) {
            return res.json({
                message: "user already register"
            });
        }
        const salt = await bcrypt.genSalt();
        const hashpass = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hashpass
        });
        const saveUser = await newUser.save();
        res.json({
            message: "Successfully Register"
        })

    } catch {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                message: "All field are required"
            });
        }
        const existUser = await User.findOne({ email: email });
        if (!existUser) {
            return res.json({
                message: "User is not register"
            });
        }
        const matchpass = await bcrypt.compare(password, existUser.password)
        if (!matchpass) {
            return res.json({
                message: "Invalid password"
            });
        }
        const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET);
        res.status(200).json({
            message: "Successfully login",
            token,
            existUser: {
                id: existUser._id,
                displayName: existUser.displayName
            }
        });
    }
    catch {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
})

router.delete("/delete", auth, async (req, res) => {
    try {
        // const { user } = req.user;
        // console.log(user);
        const delUser = await User.findByIdAndDelete(req.user);
        res.json({
            delUser,
            message: "Delete"
        })
    } catch {
        return res.json({
            message: "Somethig went wrong"
        })
    }
})

module.exports = router;