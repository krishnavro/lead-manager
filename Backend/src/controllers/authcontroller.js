const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function RegisterUser(req,res){
    try{

        const {name,email,password,phone} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                message: "User Already Exists"
            });
        }
        const hashed = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password:hashed,
            phone
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });

    }catch(error){
        res.status(500).json({
            message: "Registeration Failed",
            error: error.message
        });
    }

    
}

async function LoginUser(req,res){
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                message: "Invalid Email"
            });
        }
        const verifyPassword = await bcrypt.compare(password,user.password);
        if(!verifyPassword){
            return res.status(401).json({
                message: "Invalid Password"
            });
        }
        const token = jwt.sign({
            id: user._id
        },process.env.JWT_SECRET,{expiresIn: "1d"})

        res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });

        res.status(200).json({
            message: "User Logged Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone

            }
        })

    }catch(error){
        return res.status(500).json({
            message: "Login Failed",
            error: error.message
        })
    }
}

async function LogoutUser(req,res){
    try{
        res.clearCookie('token');
        res.status(200).json({
            message: "User Logged Out Successfully"
        })
    }catch(error){
        return res.status(500).json({
            message: "User Logout Failed",
            error: error.message
        })
    }
}

async function GetCurrentUser(req,res){
    try{
        const user = await User.findById(req.user.id).select('-password');

        if(!user){
            return res.status(404).json({
                message: "Usr not found"
            });
        }
        res.status(200).json({
            user
        });

    }
    catch(error){
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = {RegisterUser, LoginUser, LogoutUser, GetCurrentUser};