import { useState } from "react";
import api from "../api/axios";

export default function CreateQuestion() {
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAns, setCorrectAns] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function updateOption(index, value) {
    const copy = [...options];
    copy[index] = value;
    setOptions(copy);
  }

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      await api.post("/questions/createquestions", {
        subject,
        questions,
        difficulty,
        options,
        correctAns
      });

      setMsg("Question created successfully 🎯");
      setQuestions("");
      setCorrectAns("");
      setOptions(["", "", "", ""]);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3 bg-white p-5 rounded shadow">
      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />

      <textarea
        className="w-full border px-3 py-2 rounded"
        placeholder="Question Text"
        value={questions}
        onChange={e => setQuestions(e.target.value)}
      />

      <select
        className="w-full border px-3 py-2 rounded"
        value={difficulty}
        onChange={e => setDifficulty(e.target.value)}
      >
        <option>easy</option>
        <option>medium</option>
        <option>hard</option>
      </select>

      {options.map((opt, i) => (
        <input
          key={i}
          className="w-full border px-3 py-2 rounded"
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={e => updateOption(i, e.target.value)}
        />
      ))}

      <input
        className="w-full border px-3 py-2 rounded"
        placeholder="Correct Answer"
        value={correctAns}
        onChange={e => setCorrectAns(e.target.value)}
      />

      <button
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white w-full py-2 rounded"
      >
        {loading ? "Creating..." : "Create Question"}
      </button>

      {msg && <p className="text-center mt-2">{msg}</p>}
    </form>
  );
}
