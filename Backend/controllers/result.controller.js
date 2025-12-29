import Question from "../models/question.model.js"
import Result from "../models/result.model.js"

export const getResult = async (req, res) => {
  try {
    const userId = req.user.id;
    const {  answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Fields are required"
      });
    }


    const questionIds = answers.map(a => a.questionId);

    const questions = await Question.find({
      _id: { $in: questionIds }
    }).select("+correctAns");


    if (!questions.length) {
      return res.status(404).json({
        success: false,
        message: "No questions found",
      });
    }

    let score = 0;
    const totalQuestions = questions.length;
    const subject = questions[0].subject;

 
    answers.forEach(a => {
      const q = questions.find(
        q => q._id.toString() === a.questionId
      );

      if (!q) return;

      if (a.selected === q.correctAns) {
        score += 1;
      }
    });


    await Result.create({
      userId,
      subject,
      totalquestion: totalQuestions,
      score,
    });

    return res.status(200).json({
      success: true,
      score,
      totalQuestions,
      percentage: ((score / totalQuestions) * 100).toFixed(2),
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to submit quiz",
      error: error.message,
    });
  }
};



