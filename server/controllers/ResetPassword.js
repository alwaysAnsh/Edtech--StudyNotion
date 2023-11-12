const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//reset password token

exports.resetPasswordToken = async (req, res ) =>{
    try{
        //fetch the data - email
        const email = req.body.email;
        //validate the email
        const user = await User.findOne({email : email });
        if(!user)
        {
            return res.status(400).json({
                success : false,
                message : "The email you entered is not registered",
            });
        }
        //generate token 
        const token = crypto.randomBytes(20).toString("hex");
        //update User with the new value of token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                        {email : email},
                                                        {
                                                            token : token,
                                                            resetPasswordExpires : Date.now()+ 5 * 60 * 1000,
                                                        },
                                                             {new:true});
        
        console.log("updated Details : ", updatedDetails);

        //create url
        const url = `http://localhost:3000/update-password/${token}`;
        //send mail containing the url
        await mailSender(email, 
            "Reset Password ", 
        `Your Link for email verification is ${url}. Please click this url to reset your password.`);

        //return response
        return res.status(200).json({
            success : true,
            message : "email sent successfully, checkout the mail",
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message: err.message,
            message : "Something went wrong while reseting password ",
        });
    }
};

//Reset password 

exports.resetPassword = async (req,res) => {
    try {
        const { password , confirmPassword, token } = req.body;
        if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
        const userDetails = await User.findOne({token : token });
        if(!userDetails)
        {
            return res.json({
                success : false,
                message : "Token is invalid",
            });
        }
        //check the timing of reset password making sure it is not expired
        if(!(userDetails.resetPasswordExpires > Date.now())){
            return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
        }
        //hash the password
        const encryptedPassword = await bcrypt.hash(password, 10 );
        await User.findOneAndUpdate({token: token},
            {password : encryptedPassword},
            {new : true} );
            res.json({
                success: true,
                message: `Password Reset Successful`,
            });

    }catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}

};