const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");


//otp send
exports.sendotp = async ( req , res ) =>{
    try {
        const {email} = req.body;

        //check if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(401).json({
                success : false,
                message : "User already registered ",
            });
        }
        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets:false,
            specialChars: false,
        });
        console.log("otp generated successfully  ");
        
        //check if this otp is unique
        const result = await OTP.findOne({otp : otp });
        while(result)
        {
             otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets:false,
                specialChars: false,
            });
            // const result = await otp.findOne({otp : otp });
        }

        //creating otp ka object from model to store in our database
        const otpPayload = {email, otp };

        //create an entry in db
        const otpBody = await OTP.create(otpPayload);
        console.log("otp ki body is ", otpBody);

        //return response
        res.status(200).json({
            success : true,
            message : "OTP sent successfully ",
            otp,
        });

    }
    catch(error){
        res.status(500).json({
            success : false,
            message : "something went wrong while sending OTP",
        })
    }
};

//sign up

exports.signup = async ( req, res ) =>{
    //fetch all the data from req ki body
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        //validate kro
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp )
        {
            return res.status(403).json({
                success : false,
                message : "All fields are mandatory ",
            });
        }

        //validate the two passwords
        if(password !== confirmPassword)
        {
           return res.status(400).json({
                success : false,
                message : "password does not match. Please try again ",
            });
        }
        //check for existing user
        const userExisting = await User.findOne({email});
        if(userExisting)
        {
            return res.send(401).json({
                success : false,
                message : "User already exists,Please sign in to continue",
            });
        }
        //get the recent otp match
        const recentOtp = await User.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log("recent otp : ", recentOtp);

        //validate otp
        // if(otp !== recentOtp[0].otp)
        // {
        //     return res.send(400).json({
        //         success : false,
        //         message : "Invalid OTP",
        //     });
        // }
        // else if(recentOtp.length() == 0 )
        // {
        //     return res.send(400).json({
        //         success : false,
        //         message : "OTP not found",
        //     });
        // }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        //entry create in db

        const profileDetails = await Profile.create({
            gender : null,
            dateOfBirth: null,
            about : null,
            contactNumber : null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            approved : approved,
            additionalDetails : profileDetails._id,
            accountType,
            image : `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}%20${lastName} `,
        });

        //reaturn response
        return res.status(200).json({
            success : true,
            message : "user registered successfully ",
            user,
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "User can not be registered. Please try again ",
        });
    }
}

//login handler for authenticating user
exports.login = async (req, res) =>{
    try {
        //fetch the data
        const {email, password} = req.body;

        //jvalidate data
        if(!email || !password )
        {
            return res.status(400).json({
                success : false,
                message : "All fields are required. ",
            });
        }

        //check for user
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user)
        {
            return res.status(402).json({
                success : false,
                message : "Not a valid user. Please Sign In first. ",
            });
        }
        //match the password and generate JWT token
        if(await bcrypt.compare(password, user.password) )
        {
            //generate jwt token
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn: "24h",
            })
            user.token = token;
            user.password = undefined;

            //create cookie and send respose
            const options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true,
            };
            res.cookie("token", token, options ).status(200).json({
                success : true,
                token,
                user,
                message : "Logged in successfully ",
            });
        }
        else{
            return res.status(500).json({
                success : false,
                message : "Incorrect password ",
            });
        }

    }
    catch(err){
        console.log(err);
        res.status(402).json({
            success : false,
            message : "Can't login. Please try again ",
        });
    }
};

//change password

exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};
