import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./components/Home";
import Subjects from "./components/Subjects";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Login from "./components/Login";
import Signup from "./components/Sign";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";

export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");

    if (!saved || saved === "undefined") return;

    try {
      setUser(JSON.parse(saved));
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  return (
    <>
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/subjects" element={
          <RequireAuth user={user}><Subjects /></RequireAuth>
        }/>

        <Route path="/quiz/:subject" element={
          <RequireAuth user={user}><Quiz /></RequireAuth>
        }/>

        <Route path="/result" element={
          <RequireAuth user={user}><Result /></RequireAuth>
        }/>

        <Route path="/admin" element={
          <RequireAdmin user={user}><Admin /></RequireAdmin>
        }/>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function RequireAuth({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function RequireAdmin({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;
  return children;
}
