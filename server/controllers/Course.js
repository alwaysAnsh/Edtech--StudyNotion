const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
//import cloudinary ka function to be made in utils folder

//create course
//ye wala path hum kewal instructor ko denge, isliye jo id aaegi woh bhi istructor ki hi hogi(line no. 27)
exports.createCourse = async (req, res ) => {
    try {
        //fetch the data
        const { courseName, courseDescription, whatYouWillLearn, price, tag, category, status , instructions } = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category)
        {
            return res.status(400).json({
                success : false,
                message : "All fields are required ",
            });
        }
        if (!status || status === undefined) {
			status = "Draft";
		}
        
        //check for instructor -> ye toh middle ware mein check kr chuke hain toh idhr db call kyu marni pad rhi h?
        //answer -> instructor ko object id se fetch kr rhe hain isliye. Idhr pe validation nhi kr rhe 
        
        //TODO : idhr pe doubt hai
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {accountType: "Instructor"});
        console.log("instructor ki details : ", instructorDetails);

        if(!instructorDetails)
        {
            return res.status(404).json({
                success : false,
                message : "Insturctor details not found ",
            });
        }

        //check for given tag is valid tag or not 
        const categoryDetails = await Category.findById({category});
        if(!categoryDetails)
        {
            return res.status(404).json({
                success : false,
                message : "category Details details not found ",
            });
        }

        //upload image to cloudinaru.....woh thumbnailImage wali jo abhi upae likhi thi
        const thumbnailImage = await uploadImagetoCloudinary(thumbnail, process.env.FOLDER_NAME);

        //entry in db
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn : whatYouWillLearn,
            price,
            category : categoryDetails._id,
            tag : tag,
            thumbnail : thumbnailImage.secure_url,
            status : status,
            instructions : instructions,
        });

        //add the new course to user schemma of the instructor
        await User.findByIdAndUpdate(
            {_id : instructorDetails._id},
            {
                $push:{
                    courses : newCourse._id,
                },
            },
            {new : true}
        );

        //Add the new course to categories
        //homework
        await Category.findByIdAndUpdate(
           { _id : category },
           {
            $push : {
                course : newCourse._id,
            },
           },
           {new : true }
        );

        return res.status(200).json({
            success : true,
            message : "course created successfully ",
            data : newCourse,
        });




    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "fail to create course ",
            error : err.message,
        });
    }
};

//get all courses
exports.showAllCourses = async (req, res ) =>{
    try{
        const allCourses = await Course.find({}, {
                                            courseName: true,
                                            courseDescription: true,
                                            instructor: true,
                                            price : true,
                                            studentsEnrolled: true,
                                            ratingAndReviews: true,
        }).populate("instructor").exec();
        return res.status(200).json({
            success : true,
            message : "all courses data fetched successfully ",
            data : allCourses,
        });

    }catch(error){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "Can't fetch course data ",
            error : err.message,
        });
    }
};



//get course Details
exports.getCourseDetails = async (req, res) => {
    try {
            //get id
            const {courseId} = req.body;
            //find course details
            const courseDetails = await Course.find(
                                        {_id:courseId})
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails",
                                                },
                                            }
                                        )
                                        .populate("category")
                                        .populate("ratingAndreviews")
                                        .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSection",
                                            },
                                        })
                                        .exec();

                //validation
                if(!courseDetails) {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                    });
                }
                //return response
                return res.status(200).json({
                    success:true,
                    message:"Course Details fetched successfully",
                    data:courseDetails,
                })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}