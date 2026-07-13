import { useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      await api.post("/quizzes/createquiz", {
        title,
        subject,
        description,
      });

      setMsg("✅ Quiz created successfully");

      setTitle("");
      setSubject("");
      setDescription("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 flex items-center justify-center px-5 py-10"
    >
      <motion.form
        onSubmit={submit}
        className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8"
      >
        <h1 className="text-4xl font-black text-white text-center">
          Create Quiz
        </h1>

        <p className="text-slate-400 text-center mt-2 mb-8">
          Create a new quiz for your students.
        </p>

        <div className="space-y-6">

          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Quiz Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="JavaScript Basics"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Subject
            </label>

            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="javascript"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description about this quiz..."
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none resize-none focus:border-cyan-500 transition"
            />
          </div>

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white text-lg font-bold disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Quiz"}
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