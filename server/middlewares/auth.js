const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//auth 
//token se authorization 
exports.auth  = async (req, res , next ) => {
    try{
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        //if token missing toh return response
        if(!token )
        {
            return res.status(401).json({
                success : false,
                message : "Token is missing ",
            });
        }
        //verify the token
        try{
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        }catch(err){
            return res.status(402).json({
                success : false,
                message : "Token not verified",
            });
        }
        next();
        
    }catch(err){
        return res.status(401).json({
            success : false,
            message : "Something went wrong while verifying token ",
        });
    }
};


//isStudent

exports.isStudent = async (req,res,next) => {
    try{
        if(req.user.accountType !== 'Student')
        {
            return res.status(400).json({
                success : false,
                message : "This is a protected route for Student ",
            });
        }
        next();
    }catch(error){
        return res.status(401).json({
            success : false,
            message : "User can not be verified, Please try again ",
        });
    }
};



//isInstructor

exports.isInstructor = async (req,res,next) => {
    try{
        if(req.user.accountType !== 'Instructor')
        {
            return res.status(400).json({
                success : false,
                message : "This is a protected route for Instructor ",
            });
        }
        next();
    }catch(error){
        return res.status(401).json({
            success : false,
            message : "User can not be verified, Please try again ",
        });
    }
};

//isAdmin
exports.isAdmin = async (req,res,next) => {
    try{
        if(req.user.accountType !== 'Admin')
        {
            return res.status(400).json({
                success : false,
                message : "This is a protected route for Admin ",
            });
        }
        next();
    }catch(error){
        return res.status(401).json({
            success : false,
            message : "User can not be verified, Please try again ",
        });
    }
};
