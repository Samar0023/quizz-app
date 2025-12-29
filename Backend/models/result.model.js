import mongoose from "mongoose"

const  resultSchema = mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",

    },
  
    subject:{
        type:String,
        required:true,
          trim: true,
      lowercase: true,
    },
    totalquestion:{
         type:Number,
        required:true,
    },
        percentage: {
      type: Number,
    },
   score:{
     type:Number,
        required:true,
        default:0,
   }
},
{timestamps:true}
)

export default mongoose.model("Result", resultSchema)