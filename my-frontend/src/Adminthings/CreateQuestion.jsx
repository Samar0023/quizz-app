import { useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function CreateQuestion() {
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAns, setCorrectAns] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function updateOption(index, value) {
    const copy = [...options];
    copy[index] = value;
    setOptions(copy);
  }

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      await api.post("/questions/createquestions", {
        subject,
        questions,
        difficulty,
        options,
        correctAns,
      });

      setMsg("✅ Question created successfully");

      setSubject("");
      setQuestions("");
      setCorrectAns("");
      setDifficulty("easy");
      setOptions(["", "", "", ""]);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 flex items-center justify-center px-5 py-10"
    >
      <motion.form
        onSubmit={submit}
        className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8"
      >
        <h1 className="text-4xl font-black text-white text-center mb-2">
          Create Question
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Add a new quiz question to your database.
        </p>

        <div className="space-y-6">

          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500"
          />

          <textarea
            rows={4}
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            placeholder="Question"
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none resize-none focus:border-cyan-500"
          />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <div className="grid md:grid-cols-2 gap-4">
            {options.map((opt, index) => (
              <input
                key={index}
                value={opt}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500"
              />
            ))}
          </div>

          <input
            value={correctAns}
            onChange={(e) => setCorrectAns(e.target.value)}
            placeholder="Correct Answer"
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none focus:border-green-500"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Question"}
          </motion.button>

          {msg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`rounded-xl py-3 text-center font-semibold ${
                msg.includes("success")
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
            >
              {msg}
            </motion.div>
          )}

        </div>
      </motion.form>
    </motion.div>
  );
}