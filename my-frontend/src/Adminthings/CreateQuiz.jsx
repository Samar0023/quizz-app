import { useState } from "react";
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
        description
      });

      setMsg("Quiz created successfully 🎉");
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
    <form onSubmit={submit} className="space-y-4 bg-white p-5 rounded shadow">
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Quiz Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Subject (e.g. maths)"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />

      <textarea
        className="w-full border px-3 py-2 rounded"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white w-full py-2 rounded"
      >
        {loading ? "Creating..." : "Create Quiz"}
      </button>

      {msg && <p className="text-center mt-2">{msg}</p>}
    </form>
  );
}
