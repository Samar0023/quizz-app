import Quiz from  "../models/Quiz.model.js"


export const CreateQuiz = async (req,res) =>{
    try {
         const { title, subject, description } = req.body;
        if(!title || !subject || !description){
         return   res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

            const quiz = await Quiz.create({
                title , subject, description
            })
              
         return res.status(201).json({
            success:true,
             quiz,
         })

        
    } catch (error) {
           return res.status(500).json({
            success:false,
            message:"Quiz creation unsuccesfully",
            error:error.message
         })
    }
}

export const getQuiz = async (req,res) => {
    try {
        const quizzes = await Quiz.find().lean()
        res.status(200).json({
            success:true,
            count:quizzes.length,
            quizzes, 
        })
    } catch (error) {
            res.status(500).json({
            success:false,
        message: "failed to get quizzes",
           error: error.message,
            })
    }
}