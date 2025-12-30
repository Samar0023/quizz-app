import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Quiz() {
  const { subject } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState(
    searchParams.get("difficulty") || "easy"
  );

  const LIMITS = {
    easy: 10,
    medium: 15,
    hard: 20
  };

  const TIMERS = {
    easy: 10 * 60,
    medium: 7 * 60,
    hard: 5 * 60
  };

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIMERS[difficulty]);

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
        console.log("FROM API:", res.data.questions);


        let list = res.data.questions || [];

        for (let i = list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [list[i], list[j]] = [list[j], list[i]];
        }

        console.log("AFTER SHUFFLE:", list);


        list = list.slice(0, LIMITS[difficulty]).map(q => ({
          ...q,
          shuffled: [...q.options].sort(() => Math.random() - 0.5)
        }));

        setQuestions(list);
        setAnswers([]);
        setCurrent(0);
        setTimeLeft(TIMERS[difficulty]);
      } catch (e) {
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
      setTimeLeft(t => {
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
    setAnswers(prev => {
      const copy = [...prev];
      const idx = copy.findIndex(a => a.questionId === qid);
      if (idx >= 0) copy[idx].selected = option;
      else copy.push({ questionId: qid, selected: option });
      return copy;
    });
  }

  function submitQuiz() {
    navigate("/result", {
      state: {
        quizId: questions[0]?.quizId || "",
        answers
      }
    });
  }

  const currentQuestion = questions[current];
  const answered = answers.find(a => a.questionId === currentQuestion?._id)?.selected;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white/80 backdrop-blur shadow-lg rounded-2xl p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2 capitalize text-gray-800">
            {subject} Quiz
          </h1>

          <div className="flex gap-3 mb-3">
            {["easy", "medium", "hard"].map(level => (
              <button
                key={level}
                onClick={() => {
                  setDifficulty(level);
                  setSearchParams({ difficulty: level });
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  difficulty === level
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <p className="font-semibold text-lg text-red-600 mb-2">
            Time Left: {formatTime(timeLeft)}
          </p>

          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Question {current + 1}</span>
              <span>{questions.length} Total</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {loading && <p className="text-center text-gray-600">Loading…</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !questions.length && (
          <p className="text-center text-gray-700">No questions found.</p>
        )}

        {currentQuestion && (
          <div className="bg-white/90 backdrop-blur border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <p className="font-semibold text-lg text-gray-800 mb-3">
              {current + 1}. {currentQuestion.questions}
            </p>

            <div className="grid gap-2">
              {currentQuestion.shuffled.map(opt => {
                const selected = answered === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => selectAnswer(currentQuestion._id, opt)}
                    className={`text-left border rounded-lg px-4 py-2 transition ${
                      selected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {questions.length > 0 && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setCurrent(c => c - 1)}
              disabled={current === 0}
              className={`w-1/3 py-3 rounded-xl text-white text-lg font-semibold transition ${
                current === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Previous
            </button>

            {current < questions.length - 1 && (
              <button
                onClick={() => setCurrent(c => c + 1)}
                className="w-2/3 py-3 rounded-xl text-white text-lg font-semibold bg-blue-600 hover:bg-blue-700"
              >
                Next
              </button>
            )}

            {current === questions.length - 1 && (
              <button
                onClick={submitQuiz}
                className="w-2/3 py-3 rounded-xl text-white text-lg font-semibold bg-green-600 hover:bg-green-700"
              >
                Submit Quiz
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
