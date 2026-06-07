// // src/pages/Home.jsx
// // Simple useState only — no Redux

// import { useState } from "react";
// import QuestionCard from "../components/QuestionCard";
// import Navbar from "../components/Navbar";
// import AskQuestionModal from "../components/AskQuestionModal";

// // Mock data — baad mein API se aayega
// const INITIAL_QUESTIONS = [
//   {
//     id: 1,
//     title: "How does useEffect work in React?",
//     description: "I am confused about how useEffect runs. When does it run exactly — on every render or only once? Can someone explain with a simple example?",
//     votes: 42,
//     tags: ["React", "Hooks"],
//     saved: false,
//     answers: [
//       { id: 101, text: "useEffect runs after every render by default. Pass [] to run only once.", author: "rahul_dev" },
//       { id: 102, text: "Think of it as componentDidMount + componentDidUpdate combined!", author: "priya_codes" },
//     ],
//   },
//   {
//     id: 2,
//     title: "What is Redux Toolkit and why should I use it?",
//     description: "I have been using plain Redux but someone told me to switch to Redux Toolkit. What is the difference and is it worth migrating?",
//     votes: 38,
//     tags: ["Redux", "Redux Toolkit"],
//     saved: false,
//     answers: [
//       { id: 201, text: "Redux Toolkit removes boilerplate. createSlice handles everything!", author: "amit_rtk" },
//     ],
//   },
//   {
//     id: 3,
//     title: "How to do protected routes in React Router v6?",
//     description: "I want to redirect users to /login if they are not authenticated. What is the correct way to implement this in React Router v6?",
//     votes: 27,
//     tags: ["React Router", "Auth"],
//     saved: false,
//     answers: [],
//   },
//   {
//     id: 4,
//     title: "Difference between props and state in React?",
//     description: "I keep getting confused between props and state. When should I use props and when should I use state? A beginner-friendly answer would help.",
//     votes: 61,
//     tags: ["React", "Beginner"],
//     saved: false,
//     answers: [
//       { id: 401, text: "Props from parent (read-only). State is local. If data changes → state. If from parent → props.", author: "neha_react" },
//     ],
//   },
//   {
//     id: 5,
//     title: "How to use Tailwind CSS with React?",
//     description: "I installed Tailwind but the classes are not working in my React project. What is the setup I need to follow step by step?",
//     votes: 19,
//     tags: ["Tailwind CSS", "React"],
//     saved: false,
//     answers: [],
//   },
// ];

// function Home() {
//   // All questions state
//   const [questions, setQuestions] = useState(INITIAL_QUESTIONS);

//   // Search
//   const [searchQuery, setSearchQuery] = useState("");

//   // Modal open/close
//   const [showModal, setShowModal] = useState(false);

//   // Search filter
//   const filteredQuestions = questions.filter((q) =>
//     q.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Add new question from modal
//   const handleAddQuestion = ({ title, description, tags }) => {
//     const newQuestion = {
//       id: Date.now(),
//       title,
//       description,
//       tags,
//       votes: 0,
//       saved: false,
//       answers: [],
//     };
//     setQuestions([newQuestion, ...questions]);
//   };

//   // Save / Unsave toggle
//   const handleSaveToggle = (id) => {
//     setQuestions(
//       questions.map((q) =>
//         q.id === id ? { ...q, saved: !q.saved } : q
//       )
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">

//       <Navbar />

//       <main className="max-w-3xl mx-auto px-4 py-8">

//         {/* Search + Ask Question */}
//         <div className="flex gap-3 mb-8">
//           <input
//             type="text"
//             placeholder="🔍  Search questions..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
//           >
//             + Ask Question
//           </button>
//         </div>

//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-xl font-bold text-gray-800">All Questions</h1>
//           <span className="text-sm text-gray-400">{filteredQuestions.length} questions</span>
//         </div>

//         {/* Question List */}
//         <div className="flex flex-col gap-4">
//           {filteredQuestions.length > 0 ? (
//             filteredQuestions.map((question) => (
//               <QuestionCard
//                 key={question.id}
//                 question={question}
//                 onSaveToggle={handleSaveToggle}
//               />
//             ))
//           ) : (
//             <p className="text-center text-gray-400 mt-10">
//               No questions found for "{searchQuery}"
//             </p>
//           )}
//         </div>

//       </main>

//       {/* Modal */}
//       {showModal && (
//         <AskQuestionModal
//           onClose={() => setShowModal(false)}
//           onSubmit={handleAddQuestion}
//         />
//       )}

//     </div>
//   );
// }

// export default Home;
































import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import QuestionCard from "../components/QuestionCard";
import AskQuestionModal from "../components/AskQuestionModal";

import { fetchQuestions } from "../features/questions/questionSlice";

function Home() {
  const dispatch = useDispatch();

  const { questions, loading, error } = useSelector(
    (state) => state.questions
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const filteredQuestions =
    questions?.filter((q) =>
      q.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="🔍 Search questions..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            + Ask Question
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">
            All Questions
          </h1>

          <span className="text-sm text-gray-400">
            {filteredQuestions.length} questions
          </span>
        </div>

        {loading && (
          <h2 className="text-center">
            Loading Questions...
          </h2>
        )}

        {error && (
          <h2 className="text-center text-red-500">
            {error}
          </h2>
        )}

        <div className="flex flex-col gap-4">
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
            />
          ))}
        </div>

      </main>

      {showModal && (
        <AskQuestionModal
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Home;