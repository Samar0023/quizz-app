import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login({ setUser }) {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
      const res = await api.post("/auth/login",{email,password});
      const user = res.data.user;
      setUser(user);
      localStorage.setItem("user",JSON.stringify(user));
      navigate("/subjects");
    } catch(err){
      setError(err.response?.data?.message || "Login failed");
    } finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-600 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="text-white space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Welcome to QuizApp</h1>
          <p className="text-lg text-indigo-100">Sharpen your knowledge. Challenge yourself. Track your progress with clean results and simple analytics.</p>
          <p className="text-sm text-indigo-200">Join thousands of learners upgrading their skills every single day.</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign in to continue</h2>

          {error && <p className="text-center text-red-600 mb-3">{error}</p>}

          <form onSubmit={submit} className="space-y-4">
            <input
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Email"
              type="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              required
            />

            <input
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Password"
              type="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              required
            />

            <button
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-2 rounded text-lg font-semibold transition"
              type="submit"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
