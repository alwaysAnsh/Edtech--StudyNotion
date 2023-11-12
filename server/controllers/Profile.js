const User = require("../models/User");
const Profile = require("../models/Profile");
const Auth = require("../controllers/Auth");  //check this one ki ye chaiye ki nahi - koi zarurt nhi hai
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config;

//update the profile -> because Auth wale controller mein signup wale function mein pehle se hi profile wala object
//bna chuke hein, toh usko bs update krna hai

exports.updateProfile = async (req, res ) => {
    try {
        //fetch the data
        const {dateOfBirth = "", gender, about = "", contactNumber } = req.body;
        //get userId
        const id = req.user.id;
        //validate the data
        if(!contactNumber || !id ){
            return res.status(500).json({
                success : false,
                message : "All fields are required ",
            });
        }

        //find the profile
        const userDetails = await User.findById(id);
        const profileId = await userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        //update the profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        //save the details
        await profileDetails.save();
        //return res
        return res.status(200).json({
            success : true,
            message : "Profile updated succcessfully ",
        });
    }catch(error){
        console.log(error);
        return res.status(404).json({
            success : false,
            message : "Error : Profile not found ",
        });
    }
};

//delete profile

exports.deleteAccount = async ( req , res ) => {
    try {
        //get the id
        const id = req.user.id;
        //validation
        const user = await User.findById({_id : id});
        if(!user){
            return res.status(500).json({
                success : false,
                message : "User Details not foound ",
            });
        }
        //delete the profile
        await Profile.findByIdAndDelete({_id : user.userDetails}); //user.userDetails likha hai actual code mein
        //hw : unroll user from all enrolled courses

        //delete user
        await user.findByIdAndDelete({_id : id }); //chota 'u' in User is used in actual code
        //resonse send
        return res.status(200).json({
            success : true,
            message : "Profile deleted successfully ",
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "user can't be deleted successfully ",
        });
    }
};

//get details of user

exports.getAllUserDetails = async (req, res ) => {
    try {
        //get id
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success : true,
            message : "User details fetched successfully ",
            userDetails,
        });
    }catch(error ){
        return res.status(500).json({
            success : false,
            message : "Something went wrong while fetching details of user",
        });
    }
};

//update display picture
exports.updateDisplayPicture = async (req, res )=>{
    try {
        //get the user id
        const userId = req.user.id;
        //get the display picture from req.files
        const displayPicture = req.files.displayPicture;
        //upload image to cloudinary
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            10000
        )
        console.log(image);
        //updated image
        const updatedProfile = await User.findByIdAndUpdate(
            {_id : userId },
            {image : image.secure_url },
            {new : true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
          })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          })

    }
};

//get enrolled Courses

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};