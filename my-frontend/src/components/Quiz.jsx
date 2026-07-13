import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";

export default function Quiz() {
  const { subject } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState(
    searchParams.get("difficulty") || "easy"
  );

  const LIMITS = {
    easy: 20,
    medium: 15,
    hard: 10,
  };

  const TIMERS = {
    easy: 10 * 60,
    medium: 15 * 60,
    hard: 15 * 60,
  };

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIMERS[difficulty]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
      },
    },
    exit: {
      opacity: 0,
      x: -60,
      transition: {
        duration: 0.25,
      },
    },
  };

  function formatTime(t) {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(
          `/questions/getquestions?subject=${subject}&difficulty=${difficulty}&shuffle=true`
        );

        let list = res.data.questions || [];

        for (let i = list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [list[i], list[j]] = [list[j], list[i]];
        }

        list = list
          .slice(0, LIMITS[difficulty])
          .map((q) => ({
            ...q,
            shuffled: [...q.options].sort(() => Math.random() - 0.5),
          }));

        setQuestions(list);
        setAnswers([]);
        setCurrent(0);
        setTimeLeft(TIMERS[difficulty]);
      } catch {
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [subject, difficulty]);

  useEffect(() => {
    if (!questions.length) return;

    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          submitQuiz();
          return 0;
        }

        return t - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [questions]);

  function selectAnswer(qid, option) {
    setAnswers((prev) => {
      const copy = [...prev];

      const idx = copy.findIndex((a) => a.questionId === qid);

      if (idx >= 0) {
        copy[idx].selected = option;
      } else {
        copy.push({
          questionId: qid,
          selected: option,
        });
      }

      return copy;
    });
  }

  function submitQuiz() {
    navigate("/result", {
      state: {
        quizId: questions[0]?.quizId || "",
        answers,
      },
    });
  }

  const currentQuestion = questions[current];

  const answered = answers.find(
    (a) => a.questionId === currentQuestion?._id
  )?.selected;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white py-10 px-5"
    >
      <div className="max-w-4xl mx-auto"> <motion.div
  initial={{ y: -30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl mb-8"
>
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

    <div>
      <h1 className="text-4xl font-extrabold capitalize tracking-wide">
        {subject} Quiz
      </h1>

      <p className="text-slate-400 mt-2">
        Answer every question before the timer ends.
      </p>
    </div>

    <motion.div
      animate={{
        scale: timeLeft < 60 ? [1, 1.08, 1] : 1,
      }}
      transition={{
        repeat: Infinity,
        duration: 1,
      }}
      className="px-6 py-4 rounded-2xl bg-red-500/15 border border-red-500/40"
    >
      <p className="text-red-400 text-sm uppercase tracking-widest">
        Time Left
      </p>

      <h2 className="text-3xl font-bold">
        {formatTime(timeLeft)}
      </h2>
    </motion.div>

  </div>

  <div className="flex flex-wrap gap-3 mt-8">
    {["easy", "medium", "hard"].map((level) => (
      <motion.button
        whileHover={{
          scale: 1.06,
        }}
        whileTap={{
          scale: 0.96,
        }}
        key={level}
        onClick={() => {
          setDifficulty(level);
          setSearchParams({
            difficulty: level,
          });
        }}
        className={`px-6 py-3 rounded-xl font-semibold transition-all ${
          difficulty === level
            ? "bg-blue-600 shadow-lg shadow-blue-500/40"
            : "bg-slate-800 hover:bg-slate-700"
        }`}
      >
        {level.toUpperCase()}
      </motion.button>
    ))}
  </div>

  <div className="mt-8">

    <div className="flex justify-between text-slate-400 mb-3">
      <span>
        Question {current + 1}
      </span>

      <span>
        {questions.length} Questions
      </span>
    </div>

    <div className="h-3 rounded-full bg-slate-800 overflow-hidden">

      <motion.div
        animate={{
          width: `${((current + 1) / questions.length) * 100}%`,
        }}
        transition={{
          duration: 0.4,
        }}
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
      />

    </div>

  </div>
</motion.div>

{loading && (
  <div className="text-center text-slate-400 text-xl py-20">
    Loading Questions...
  </div>
)}

{error && (
  <div className="text-center text-red-400 text-xl py-20">
    {error}
  </div>
)}

{!loading && !questions.length && (
  <div className="text-center text-slate-400 text-xl py-20">
    No Questions Found
  </div>
)}

<AnimatePresence mode="wait">

  {currentQuestion && (
    <motion.div
      key={current}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8"
    >
      <h2 className="text-2xl font-bold leading-relaxed mb-8">
        {current + 1}. {currentQuestion.questions}
      </h2>

      <div className="space-y-4">

        {currentQuestion.shuffled.map((opt) => {

          const selected = answered === opt;

          return (
            <motion.button
              key={opt}
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() =>
                selectAnswer(currentQuestion._id, opt)
              }
              className={`w-full text-left px-6 py-5 rounded-2xl border transition-all ${
                selected
                  ? "bg-blue-600 border-blue-400 shadow-lg shadow-blue-500/30"
                  : "bg-slate-900/70 border-slate-700 hover:border-blue-500 hover:bg-slate-800"
              }`}
            >
              {opt}
            </motion.button>
          );

        })}

      </div>
    </motion.div>
  )}

</AnimatePresence>{questions.length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="flex flex-col sm:flex-row gap-4 mt-8"
  >
    <motion.button
      whileHover={{ scale: current === 0 ? 1 : 1.03 }}
      whileTap={{ scale: current === 0 ? 1 : 0.97 }}
      disabled={current === 0}
      onClick={() => setCurrent((c) => c - 1)}
      className={`sm:w-1/3 py-4 rounded-2xl font-semibold text-lg transition ${
        current === 0
          ? "bg-slate-800 text-slate-500 cursor-not-allowed"
          : "bg-slate-700 hover:bg-slate-600"
      }`}
    >
      Previous
    </motion.button>

    {current < questions.length - 1 ? (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setCurrent((c) => c + 1)}
        className="sm:w-2/3 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:shadow-xl hover:shadow-cyan-500/30"
      >
        Next Question →
      </motion.button>
    ) : (
      <motion.button
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 0px 25px rgba(34,197,94,.5)",
        }}
        whileTap={{ scale: 0.97 }}
        onClick={submitQuiz}
        className="sm:w-2/3 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-green-500 to-emerald-600"
      >
        Submit Quiz 🚀
      </motion.button>
    )}
  </motion.div>
)}

{questions.length > 0 && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4 }}
    className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-5"
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-slate-400 text-sm">Answered</p>
        <h3 className="text-2xl font-bold">
          {answers.length} / {questions.length}
        </h3>
      </div>

      <div className="text-right">
        <p className="text-slate-400 text-sm">Difficulty</p>
        <h3 className="text-xl font-bold capitalize text-cyan-400">
          {difficulty}
        </h3>
      </div>
    </div>

    <div className="mt-4 grid grid-cols-5 sm:grid-cols-10 gap-2">
      {questions.map((q, index) => {
        const done = answers.some((a) => a.questionId === q._id);

        return (
          <motion.button
            key={q._id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrent(index)}
            className={`h-10 rounded-xl font-semibold transition ${
              index === current
                ? "bg-cyan-500 text-white"
                : done
                ? "bg-green-600"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            {index + 1}
          </motion.button>
        );
      })}
    </div>
  </motion.div>
)}

</div>
</motion.div>
);
}