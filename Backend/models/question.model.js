import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
   

        questions:{
        type:String,
        required:true,
        },

        subject:{
           type:String,
        required:true,
        },

       difficulty:{
     type:String,
     required:true,
     enum:["easy","medium","hard"],
     default:"easy",
     },

     options:{
       type:[String],
        required:true,
        validate: { validator: function (v) { return v.length >= 2; },
         message: "At least 2 options are required", 
        },
     },

     correctAns:{
        type:String,
        required:true,
        select:false,
     },

     marks:{
        type:Number,
        default:1,
     }
        
},
{timestamps:true}
)

export default mongoose.model("Question", questionSchema);