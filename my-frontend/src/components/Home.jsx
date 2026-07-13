"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
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
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        whileHover={{ y: -6 }}
        className="relative z-10 w-full max-w-3xl"
      >
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.45)] md:p-16">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-5 py-2 text-sm font-medium text-indigo-300">
              ✨ Premium Quiz Experience
            </div>
          </div>

          <h1 className="text-center text-5xl font-black tracking-tight text-white md:text-7xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              QuizApp
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-8 text-slate-300 md:text-xl">
            Sharpen your knowledge with fun, timed quizzes. Choose a subject,
            pick a difficulty, and challenge yourself with a premium learning
            experience.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg"
              >
                Login →
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                to="/signup"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>

          <div className="mt-10 text-center text-sm text-slate-400">
            Or explore quizzes as a guest
          </div>
        </div>
      </motion.div>
    </div>
  );
}