// src/components/QuestionCard.jsx
// Simple useState only — no Redux

import { useState } from "react";

function QuestionCard({ question, onSaveToggle }) {
  const [votes, setVotes] = useState(question.votes);
  const [showAnswers, setShowAnswers] = useState(false);
  const [answers, setAnswers] = useState(question.answers || []);
  const [answerText, setAnswerText] = useState("");

  const handleAddAnswer = () => {
    if (answerText.trim() === "") return;
    setAnswers([...answers, { id: Date.now(), text: answerText, author: "You" }]);
    setAnswerText("");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">

      {/* Tags */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {question.tags.map((tag) => (
          <span key={tag} className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 mb-2">{question.title}</h2>

      {/* Description */}
      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{question.description}</p>

      {/* Bottom Row */}
      <div className="flex items-center justify-between flex-wrap gap-2">

        {/* Left: Upvote / Downvote / Answers */}
        <div className="flex items-center gap-2">

          {/* Upvote */}
          <button
            onClick={() => setVotes(votes + 1)}
            className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-green-100 hover:text-green-600 text-gray-600 px-3 py-1 rounded-full transition-colors"
          >
            👍 <span>{votes}</span>
          </button>

          {/* Downvote */}
          <button
            onClick={() => setVotes(votes - 1)}
            className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-red-100 hover:text-red-500 text-gray-600 px-3 py-1 rounded-full transition-colors"
          >
            👎
          </button>

          {/* Answers toggle */}
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-600 text-gray-500 px-3 py-1 rounded-full transition-colors"
          >
            💬 {answers.length} answers
          </button>

        </div>

        {/* Right: Save + View Details */}
        <div className="flex items-center gap-3">

          {/* Save Button */}
          <button
            onClick={() => onSaveToggle(question.id)}
            className={`text-sm font-medium px-4 py-1.5 rounded-full border transition-colors ${question.saved
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-blue-500 hover:text-blue-600"
              }`}
          >
            {question.saved ? "✓ Saved" : "Save"}
          </button>

          <button className="text-sm text-blue-600 font-medium hover:underline">
            View Details →
          </button>

        </div>
      </div>

      {/* Answers Panel */}
      {showAnswers && (
        <div className="mt-4 border-t border-gray-100 pt-4">

          {answers.length > 0 ? (
            <div className="flex flex-col gap-3 mb-4">
              {answers.map((ans) => (
                <div key={ans.id} className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
                  <p className="text-sm text-gray-700">{ans.text}</p>
                  <span className="text-xs text-gray-400 mt-1 block">— {ans.author}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 mb-4">No answers yet. Be the first!</p>
          )}

          {/* Write Answer */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Write your answer..."
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={handleAddAnswer}
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default QuestionCard;
