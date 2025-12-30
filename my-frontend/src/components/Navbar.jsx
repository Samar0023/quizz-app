import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
  <nav className="bg-gray-900 text-white px-4 py-3 flex flex-wrap justify-between items-center gap-2">

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
           <span className="hidden sm:inline text-gray-300 truncate max-w-[120px]">
  {user.email} ({user.role})
</span>


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
