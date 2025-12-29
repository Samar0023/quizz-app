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

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(
          `/questions/getquestions?subject=${subject}&difficulty=${difficulty}&shuffle=true&limit=10`
        );

        setQuestions(res.data.questions || []);
        setAnswers([]);
      } catch (err) {
        console.error(err);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [subject, difficulty]);

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

  const progress =
    questions.length === 0 ? 0 : (answers.length / questions.length) * 100;

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
                className={`px-4 py-2 rounded-full text-sm font-medium transition 
                ${
                  difficulty === level
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

      
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{answers.length} answered</span>
              <span>{questions.length} total</span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {loading && (
          <p className="text-center text-gray-600">Loading…</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && !questions.length && (
          <p className="text-center text-gray-700">
            No questions found.
          </p>
        )}

        <div className="space-y-6">
          {questions.map((q, i) => (
            <div
              key={q._id}
              className="bg-white/90 backdrop-blur border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-lg text-gray-800 mb-3">
                {i + 1}. {q.questions}
              </p>

              <div className="grid gap-2">
                {q.options.map(opt => {
                  const selected =
                    answers.find(a => a.questionId === q._id)?.selected === opt;

                  return (
                    <button
                      key={opt}
                      onClick={() => selectAnswer(q._id, opt)}
                      className={`text-left border rounded-lg px-4 py-2 transition 
                      ${
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
          ))}
        </div>

      
        {questions.length > 0 && (
          <button
            onClick={submitQuiz}
            disabled={answers.length !== questions.length}
            className={`mt-8 w-full py-3 rounded-xl text-white text-lg font-semibold transition 
            ${
              answers.length === questions.length
                ? "bg-green-600 hover:bg-green-700 shadow"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}
