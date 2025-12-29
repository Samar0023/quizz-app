import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-lg">
      <div className="flex gap-6 items-center">
        <Link to="/" className="font-extrabold text-2xl tracking-wide">
          QuizApp
        </Link>

        {user && (
          <Link
            to="/subjects"
            className="hover:text-blue-300 transition-colors"
          >
            Subjects
          </Link>
        )}

        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="px-3 py-1 rounded-full bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition"
          >
            Admin Panel
          </Link>
        )}
      </div>

      <div className="flex gap-4 items-center">
        {!user && (
          <>
            <Link
              to="/login"
              className="hover:text-blue-300 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:text-blue-300 transition-colors"
            >
              Signup
            </Link>
          </>
        )}

        {user && (
          <>
            <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
              {user.email} ({user.role})
            </div>

            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg font-medium transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
