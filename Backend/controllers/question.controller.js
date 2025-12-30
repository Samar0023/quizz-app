import questionSchema from "../models/question.model.js"
import Quiz from "../models/Quiz.model.js"


export const getQuestions = async (req, res) => {

    try {
        const {  difficulty, subject, limit, shuffle } = req.query
        if (!subject || !difficulty) {
            return res.status(400).json({
                success: false,
                message: "quizId and difficulty are required",
            })
        }

        const allowedDifficulties = ["easy", "medium", "hard"]

        if (!allowedDifficulties.includes(difficulty.toLowerCase())) {
          return  res.status(400).json({
                success: false,
                message: "correct difficulty is required",
            })
        }
        const parsedLimit = Number(limit) || 30;

        const doShuffle = shuffle === "true" || shuffle === true;

    const subjectNormalized = subject.trim().toLowerCase();

let questions = await questionSchema.find({
  subject: { $regex: `^${subjectNormalized}$`, $options: "i" },
  difficulty: { $regex: `^${difficulty}$`, $options: "i" }
});


console.log("BACKEND RETURNING:", questions.length);
           


        if (doShuffle) {
            questions.sort(() => Math.random() - 0.5);
        }

        return res.status(200).json({
            succes: true,
            count: questions.length,
            questions,
        })





    } catch (error) {
        res.status(500).json({
            success: false,
            message: "unable to get questions",
            error: error.message
        })
    }
}



export const createQuestions = async (req, res) => {
    try {
        const {  subject, questions, difficulty, options, correctAns } = req.body;

        if ( !questions || !subject || !difficulty || !options || !correctAns) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        }

        const allowed = ["easy", "medium", "hard"]
        if (!allowed.includes(difficulty.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: "correct difficulty lvls  are required"
            })
        }

        if (!Array.isArray(options) || options.length != 4) {
            return res.status(400).json({
                success: false,
                message: "Four options required"
            })
        }

        if (!options.includes(correctAns)) {
            return res.status(400).json({
                success: false,
                message: " answers are  required"
            })
        }

        const subjectNormalized = subject.trim().toLowerCase();

        const quizzexist = await Quiz.findOne({ subject: subjectNormalized });

        if (!quizzexist) {
            return res.status(404).json({
                success: false,
                message: "Particular Quiz Not Available"
            })
        }

        const created = await questionSchema.create({
          subject: subjectNormalized,
            questions,
            difficulty: difficulty.toLowerCase(),
            options,
            correctAns,
        });

        return res.status(201).json({
            success: true,
            message: "Question created succesfully",
            questions: created
        })
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create Question",
            error: error.message,
        })
    }
}