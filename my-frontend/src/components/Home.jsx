export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 flex items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center">

        <div className="inline-block bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl px-8 py-10 border border-white/50">

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">QuizApp</span>
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            Sharpen your knowledge with fun, timed quizzes. Choose a subject, pick a difficulty, and challenge yourself!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/login"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition-all hover:scale-105"
            >
              Login
            </a>

            <a
              href="/signup"
              className="px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold border border-blue-200 hover:border-blue-400 shadow transition-all hover:scale-105"
            >
              Sign Up
            </a>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            Or explore quizzes as a guest
          </div>

        </div>
      </div>
    </div>
  );
}
