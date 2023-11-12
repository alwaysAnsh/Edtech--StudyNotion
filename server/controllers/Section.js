const Section = require("../models/Section");
const Course = require("../models/Course");

//create section

exports.createSection = async (req,res) => {
    try {
        //data fetch
        const {sectionName, courseId} = req.body;
        //validation
        if(!sectionName || !courseId )
        {
            return res.status(400).json({
                success :false,
                message : "All fields are required",
            });
        }
        //create section
        const newSection = await Section.create({sectionName});
        //add this section to course with section ki objectId
        const updateCourseDetails = await Course.findByIdAndUpdate(
                                            courseId,{
                                                $push:{
                                                    courseContent : newSection._id,
                                                }
                                            },{new : true},
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();    
        // use populate to replace section/subsection both in the updatedCourseDetails
        //return response
        return res.status(200).json({
            success : true,
            message : "Section created successfully ",
            updateCourseDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Unable to create section. please try again",
            message: error.message,
        });
    }
};

//update a section

exports.updateSection = async (req, res ) => {
    try{
        //data input
        const{sectionName, sectionId } = req.body;
        //data validation
        if(!sectionName || !sectionId )
        {
            return res.status(400).json({
                success :false,
                message : "All fields are required",
            });
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new : true} );
        //return res
        return res.status(200).json({
            success : true,
            message : "Section Updated successfully ",
        });

    }catch(error){
        return res.status(500).json({
            success : false,
            message : "Unable to update section. please try again",
            message: error.message,
        });
    }
};


//delete section

exports.deleteSection = async (req, res ) => {
    try{
        //get id - assuming that we are sending id in parameter in routes woh delete wala 
        const {sectionId} = req.params;
        //delete by using findByIdAndDelete
        await Section.findByIdAndDelete({sectionId});
        //TODO[testing] = do we need to delete this from course Schema too ??
        //response return
        return res.status(200).json({
            success : true,
            message : "Section Deleted successfully ",
        });
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "Unable to Delete section. please try again",
            message: error.message,
        });
    }
}