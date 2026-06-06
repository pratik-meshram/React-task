import React from 'react'

function Navbar() {
    return (
        <div>
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">

                {/* Logo */}
                <div className="text-2xl font-bold text-blue-600">
                    Dev<span className="text-gray-800">Q&A</span>
                </div>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                    <a href="#" className="hover:text-blue-600">Home</a>
                    <a href="#" className="hover:text-blue-600">My Questions</a>
                    <a href="#" className="hover:text-blue-600">Bookmarks</a>
                    <a href="#" className="hover:text-blue-600">My dashbord</a>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                    <button className="text-sm text-gray-600 hover:text-blue-600 font-medium">
                        Log In
                    </button>
                    <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Sign Up
                    </button>
                </div>

            </nav>
        </div>
    )
}

export default Navbar
