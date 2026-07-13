import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!state) {
      setError("No quiz data found");
      return;
    }

    api
      .post("/results/submitresult", {
        quizId: state.quizId,
        answers: state.answers,
      })
      .then((res) => setData(res.data))
      .catch(() => {
        setError("Failed to submit quiz");
      });
  }, []);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400 text-xl">
        {error}
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-14 h-14 rounded-full border-4 border-cyan-500 border-t-transparent"
        />
      </div>
    );

  const pass = data.percentage >= 40;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 flex items-center justify-center px-6">

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-10"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-black text-center text-white"
        >
          Quiz Completed 🎉
        </motion.h1>

        <p className="text-center text-slate-400 mt-3">
          Here is your performance summary.
        </p>

        <motion.div
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 120,
          }}
          className="flex justify-center mt-10"
        >
          <div
            className={`w-44 h-44 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 ${
              pass
                ? "bg-gradient-to-br from-green-500 to-emerald-700 border-green-300"
                : "bg-gradient-to-br from-red-500 to-red-700 border-red-300"
            }`}
          >
            <span className="text-5xl font-black text-white">
              {data.percentage}%
            </span>

            <span className="text-white/80 mt-2">
              Your Score
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 mt-10">

          <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-5 text-center">
            <p className="text-slate-400 text-sm">
              Correct Answers
            </p>

            <h2 className="text-3xl font-bold text-cyan-400 mt-2">
              {data.score}
            </h2>
          </div>

          <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-5 text-center">
            <p className="text-slate-400 text-sm">
              Total Questions
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {data.totalQuestions}
            </h2>
          </div>

        </div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className="mt-8 text-center"
        >
          <h2
            className={`text-2xl font-bold ${
              pass ? "text-green-400" : "text-red-400"
            }`}
          >
            {pass
              ? "Congratulations! You Passed 🎊"
              : "Keep Practicing 💪"}
          </h2>

          <p className="text-slate-400 mt-3">
            {pass
              ? "Excellent work! You're ready for the next challenge."
              : "Practice a little more and come back stronger."}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 mt-10">

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() => navigate("/subjects")}
            className="py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600"
          >
            Take Another Quiz
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() => navigate(-1)}
            className="py-4 rounded-2xl font-semibold text-lg bg-slate-800 border border-slate-700 hover:bg-slate-700"
          >
            Retake Quiz
          </motion.button>

        </div>
      </motion.div>

    </div>
  );
}