import { useState } from "react";
import CreateQuiz from "../Adminthings/CreateQuiz";
import CreateQuestion from "../Adminthings/CreateQuestion";

export default function Admin() {
  const [tab, setTab] = useState("quiz");

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="flex gap-4 justify-center mb-6">
        <button 
          className={`px-6 py-2 rounded ${tab==="quiz"?"bg-blue-600 text-white":"bg-gray-200"}`}
          onClick={()=>setTab("quiz")}
        >
          Create Quiz
        </button>

        <button 
          className={`px-6 py-2 rounded ${tab==="question"?"bg-blue-600 text-white":"bg-gray-200"}`}
          onClick={()=>setTab("question")}
        >
          Create Question
        </button>
      </div>

      {tab==="quiz" ? <CreateQuiz /> : <CreateQuestion />}
    </div>
  );
}
