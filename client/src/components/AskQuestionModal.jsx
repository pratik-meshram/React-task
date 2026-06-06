// src/components/AskQuestionModal.jsx
// Simple useState only — no Redux

import { useState } from "react";

function AskQuestionModal({ onClose, onSubmit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tagsInput, setTagsInput] = useState("");

    const handleSubmit = () => {
        if (title.trim() === "" || description.trim() === "") return;

        const tags = tagsInput.split(",").map((t) => t.trim()).filter((t) => t !== "");

        onSubmit({ title, description, tags });
        onClose();
    };

    return (
        // Backdrop
        <div
            className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4"
            onClick={onClose}
        >
            {/* Modal Box */}
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-gray-800">Ask a Question</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
                </div>

                {/* Title */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. How does useState work?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                        placeholder="Describe your problem..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    />
                </div>

                {/* Tags */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tags <span className="text-gray-400 font-normal">(comma separated)</span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. React, Hooks"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-600 border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="text-sm bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
                    >
                        Post Question
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AskQuestionModal;
