const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : 
        {
            type : String,
            
        },
    
    course : [
        {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            trim : true,
            ref : "Course",
        }
        
    ],

});

module.exports = mongoose.model("Category", categorySchema);