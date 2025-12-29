import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connect.js"
import quizRoutes from "./routes/Quiz.route.js"
import questionRoutes from "./routes/question.route.js"
import userRoutes  from "./routes/user.route.js"
import resultRoutes from "./routes/result.route.js"
import cors from "cors";
import cookieParser from "cookie-parser";




const app = express();
const PORT = 3000;
dotenv.config()
connectDB();






app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))




app.use(cookieParser());
app.use(express.json())



app.use("/api/quizzes" , quizRoutes)
app.use("/api/questions" , questionRoutes)
app.use("/api/auth" , userRoutes)
app.use("/api/results", resultRoutes)





app.get("/", (req,res)=>{
  res.send("Quiz App backend running");
});

app.listen(PORT , ()=>console.log(`Backend running on ${PORT}`)); 
