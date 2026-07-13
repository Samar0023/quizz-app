import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <motion.nav
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-8">

          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to="/"
              className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
            >
              QuizApp
            </Link>
          </motion.div>

          {user && (
            <motion.div whileHover={{ y: -2 }}>
              <Link
                to="/subjects"
                className="text-slate-300 hover:text-cyan-400 transition font-medium"
              >
                Subjects
              </Link>
            </motion.div>
          )}

          {user?.role === "admin" && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/admin"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg"
              >
                Admin Panel
              </Link>
            </motion.div>
          )}

        </div>

        <div className="flex items-center gap-4">

          {!user && (
            <>
              <motion.div whileHover={{ y: -2 }}>
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-cyan-400 transition font-medium"
                >
                  Login
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold"
                >
                  Signup
                </Link>
              </motion.div>
            </>
          )}

          {user && (
            <>
              <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700">

                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold">
                  {user.email.charAt(0).toUpperCase()}
                </div>

                <div className="leading-tight">
                  <p className="text-sm font-semibold text-white truncate max-w-[180px]">
                    {user.email}
                  </p>

                  <p className="text-xs uppercase tracking-wider text-cyan-400">
                    {user.role}
                  </p>
                </div>

              </div>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 20px rgba(239,68,68,.4)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-700 font-semibold"
              >
                Logout
              </motion.button>
            </>
          )}

        </div>

      </div>
    </motion.nav>
  );
}