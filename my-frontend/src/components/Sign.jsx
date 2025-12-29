import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {
  const [form,setForm]=useState({username:"",email:"",password:""});
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  async function submit(e){
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
      await api.post("/auth/signup",form);
      navigate("/login");
    }catch(err){
      setError(err.response?.data?.message || "Signup failed");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="text-white space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Create Your Account</h1>
          <p className="text-lg text-indigo-100">
            Start your learning journey today. Track results, test yourself, and grow faster with QuizApp.
          </p>
          <p className="text-sm text-indigo-200">It only takes a minute to get started.</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign up</h2>

          {error && <p className="text-center text-red-600 mb-3">{error}</p>}

          <form onSubmit={submit} className="space-y-4">
            <input
              name="username"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Username"
              onChange={e=>setForm({...form,[e.target.name]:e.target.value})}
              required
            />

            <input
              name="email"
              type="email"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Email"
              onChange={e=>setForm({...form,[e.target.name]:e.target.value})}
              required
            />

            <input
              name="password"
              type="password"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Password"
              onChange={e=>setForm({...form,[e.target.name]:e.target.value})}
              required
            />

            <button
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-2 rounded text-lg font-semibold transition"
              type="submit"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
