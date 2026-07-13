import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
        (q) =>
          q.title.toLowerCase().includes(s) ||
          q.subject.toLowerCase().includes(s)
      )
    );
  }, [search, quizzes]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-14 h-14 rounded-full border-4 border-indigo-500 border-t-transparent"
        />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816] text-red-400 text-xl">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">

      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-14">

        <motion.div
          initial={{ opacity: 0, y: -35 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-black text-center">
            Choose Your Quiz
          </h1>

          <p className="text-gray-400 mt-3 text-center">
            Test your knowledge across multiple subjects.
          </p>
        </motion.div>

       

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .2 }}
          className="max-w-xl mx-auto mt-10"
        >
          <input
            type="text"
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-white/10
            bg-white/5 backdrop-blur-xl px-6 py-4
            text-white placeholder:text-gray-500
            focus:outline-none focus:ring-2
            focus:ring-indigo-500 transition"
          />
        </motion.div>

     

        <motion.div
          layout
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-14"
        >
          {filtered.map((q, index) => (
            <motion.div
              key={q._id}
              layout
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * .08,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              whileTap={{
                scale: .97,
              }}
              onClick={() =>
                navigate(`/quiz/${q.subject}?difficulty=easy`)
              }
              className="
              group cursor-pointer
              rounded-3xl
              border border-white/10
              bg-white/5
              backdrop-blur-2xl
              p-7
              transition
              hover:border-indigo-500/60
              hover:shadow-[0_0_45px_rgba(99,102,241,.25)]
              "
            >
              <div className="flex justify-between items-center">

                <span className="px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm capitalize">
                  {q.subject}
                </span>

                <span className="text-indigo-400 text-xl group-hover:translate-x-1 transition">
                  →
                </span>

              </div>

              <h2 className="text-2xl font-bold mt-7">
                {q.title}
              </h2>

              <p className="text-gray-400 mt-4 leading-7">
                {q.description}
              </p>

              <div className="mt-8 flex justify-between items-center">

                <span className="text-sm text-gray-500">
                  Difficulty
                </span>

                <span className="text-green-400 font-semibold">
                  Easy
                </span>

              </div>
            </motion.div>
          ))}
        </motion.div>

        {!filtered.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-20 text-gray-500 text-lg"
          >
            No quizzes found.
          </motion.div>
        )}
      </div>
    </div>
  );
}