import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
      subject:{
        type:String,
        required:true,
     },
   
    description:{
        type:String,
        required:true,
    }
},
   {timestamps:true}
)

export default mongoose.model("Quiz", quizSchema)