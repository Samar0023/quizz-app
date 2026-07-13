import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const user = res.data.user;

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/subjects");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center px-6">
      <motion.div
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, -100, 80, 0],
          y: [0, 100, -60, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-cyan-500/20 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, 60, -70, 0],
          y: [0, 40, -50, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/3 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[120px]"
      />

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.3)_60%,rgb(2,6,23)_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-6 text-white">
          <div className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-300">
            🚀 Welcome Back
          </div>

          <h1 className="text-5xl font-black leading-tight">
            Continue your
            <span className="block bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h1>

          <p className="text-lg leading-8 text-slate-300">
            Sharpen your knowledge, challenge yourself with timed quizzes,
            monitor your performance, and become a better learner every day.
          </p>

          <div className="flex gap-8 pt-4">
            <div>
              <h2 className="text-3xl font-bold">1000+</h2>
              <p className="text-slate-400">Questions</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">25+</h2>
              <p className="text-slate-400">Subjects</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">24/7</h2>
              <p className="text-slate-400">Learning</p>
            </div>
          </div>
        </div>

        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            Login
          </h2>

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 py-4 text-lg font-semibold text-white shadow-lg transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}