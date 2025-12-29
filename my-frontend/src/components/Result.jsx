import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Result() {
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      setError("No quiz data found");
      return;
    }

    console.log("SUBMIT PAYLOAD:", state);

    api.post("/results/submitresult", {
      quizId: state.quizId,
      answers: state.answers,
    })
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err.response?.data);
        setError("Failed to submit quiz");
      });
  }, []);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-700 text-lg">
        {error}
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 text-gray-700">
        Submitting your quiz…
      </div>
    );

  const pass = data.percentage >= 40;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 flex justify-center items-center px-4">
      <div className="max-w-xl w-full bg-white/90 backdrop-blur shadow-xl rounded-2xl p-8 text-center">

        <h1 className="text-3xl font-bold mb-2">Your Result</h1>
        <p className="text-gray-500 mb-6">
          Thanks for completing the quiz 🎉
        </p>


        <div className="flex justify-center mb-6">
          <div
            className={`w-36 h-36 rounded-full flex flex-col items-center justify-center text-white text-2xl font-bold shadow
            ${pass ? "bg-green-500" : "bg-red-500"}`}
          >
            {data.percentage}%
            <span className="text-sm font-normal mt-1">Score</span>
          </div>
        </div>

        <p className="text-lg font-semibold">
          {data.score} / {data.totalQuestions} correct
        </p>

        <p className={`mt-2 text-md font-medium ${pass ? "text-green-600" : "text-red-600"}`}>
          {pass ? "Well done! You passed 👍" : "Keep practicing 💪"}
        </p>

       
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => navigate("/subjects")}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Take Another Quiz
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full py-3 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 transition"
          >
            Retake This Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
