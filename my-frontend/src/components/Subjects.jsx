import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Subjects() {
  const [quizzes, setQuizzes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await api.get("/quizzes/getquiz");
        const list = res.data.quizzes || [];
        setQuizzes(list);
        setFiltered(list);
      } catch (e) {
        setError("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const s = search.toLowerCase();
    setFiltered(
      quizzes.filter(
        q =>
          q.title.toLowerCase().includes(s) ||
          q.subject.toLowerCase().includes(s)
      )
    );
  }, [search, quizzes]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 text-gray-700 text-lg">
        Loading…
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-600 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Select a Quiz</h1>

        <div className="max-w-md mx-auto mb-8">
          <input
            className="w-full border px-4 py-2 rounded-lg shadow bg-white"
            placeholder="Search quizzes or subjects…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(q => (
            <div
              key={q._id}
              onClick={() => navigate(`/quiz/${q.subject}?difficulty=easy`)}
              className="bg-white/90 backdrop-blur border rounded-2xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold">{q.title}</h2>
              <p className="text-gray-600 mt-2">{q.description}</p>
              <div className="mt-4 inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm capitalize">
                {q.subject}
              </div>
            </div>
          ))}
        </div>

        {!filtered.length && (
          <p className="text-center text-gray-600 mt-6">
            No quizzes match your search.
          </p>
        )}
      </div>
    </div>
  );
}
