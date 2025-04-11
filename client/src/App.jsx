"use client"

import { useState } from "react"
import { ArrowRight, Home, FileText, Download } from "lucide-react"
import ChatInterface from "./components/ChatInterface"

function App() {
  const [showChat, setShowChat] = useState(false)
  const [chatKey, setChatKey] = useState(0) // Add a key to force re-render

  // Function to start a new chat
  const startNewChat = () => {
    if (showChat) {
      // If already in a chat, increment the key to reset the component
      setChatKey(prevKey => prevKey + 1)
    } else {
      // If not in a chat yet, just show the chat interface
      setShowChat(true)
    }
  }

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 flex flex-col">
        <div className="p-4 flex flex-col gap-2">
          <button 
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800"
            onClick={startNewChat}
          >
            <span className="w-6 h-6 flex items-center justify-center bg-amber-500 text-black rounded-md">+</span>
            <span>New Chat</span>
          </button>
        </div>

        <div className="px-4 py-2 text-gray-400 text-sm">Previous 30 Days</div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2 text-gray-400 text-sm">Today</div>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center gap-2">
            <span className="text-gray-400">
              <FileText size={16} />
            </span>
            <span>Legal Advice: Criminal Law</span>
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center gap-2">
            <span className="text-gray-400">
              <FileText size={16} />
            </span>
            <span>Legal Advice: Family Law</span>
          </button>

          <div className="px-4 py-2 text-gray-400 text-sm">Yesterday</div>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-800 flex items-center gap-2">
            <span className="text-gray-400">
              <FileText size={16} />
            </span>
            <span>Legal Advice: Property Law</span>
          </button>
        </div>

        <div className="p-4 border-t border-gray-800">
          <button className="w-full text-left flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-xs">U</div>
            <span>Your name</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {showChat ? (
          <ChatInterface 
            key={chatKey} // Add key prop to force re-render
            onBack={() => setShowChat(false)} 
          />
        ) : (
          <>
            {/* Navigation */}
            <div className="flex justify-center p-4">
              <div className="bg-gray-900 rounded-full flex items-center p-1">
                <button className="px-4 py-2 rounded-full bg-black">
                  <Home size={16} className="inline mr-2" /> Home
                </button>
                <button className="px-4 py-2 rounded-full">
                  <FileText size={16} className="inline mr-2" /> Documentation
                </button>
                <button className="px-4 py-2 rounded-full">
                  <Download size={16} className="inline mr-2" /> Download
                </button>
              </div>
            </div>

            {/* Hero Section */}
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <h1 className="text-5xl font-bold mb-12">Legal Advisor AI</h1>

              <button
                onClick={startNewChat}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mb-12"
              >
                Get Started <ArrowRight size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                <div className="col-span-1">
                  <h2 className="text-xl font-semibold mb-4">Recent</h2>
                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-amber-500">
                    <h3 className="font-medium">Criminal Law:</h3>
                    <p className="text-gray-300 text-sm">Get advice on criminal charges and procedures.</p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-amber-500 mt-4">
                    <h3 className="font-medium">Family Law:</h3>
                    <p className="text-gray-300 text-sm">Divorce, custody, and family legal matters.</p>
                  </div>
                </div>

                <div className="col-span-1">
                  <h2 className="text-xl font-semibold mb-4">Frequent</h2>
                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="font-medium">Property Rights:</h3>
                    <p className="text-gray-300 text-sm">Understand your property and tenant rights.</p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500 mt-4">
                    <h3 className="font-medium">Employment Law:</h3>
                    <p className="text-gray-300 text-sm">Workplace issues and employment rights.</p>
                  </div>
                </div>

                <div className="col-span-1">
                  <h2 className="text-xl font-semibold mb-4">Recommended</h2>
                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-purple-500">
                    <h3 className="font-medium">Consumer Rights:</h3>
                    <p className="text-gray-300 text-sm">Protect yourself as a consumer.</p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-purple-500 mt-4">
                    <h3 className="font-medium">Immigration Law:</h3>
                    <p className="text-gray-300 text-sm">Visa, citizenship, and immigration advice.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 text-center text-gray-400 text-sm">
              <p>
                Legal Advisor AI may provide general information about legal topics, but does not constitute legal
                advice. Version 1.0 © 2025.
              </p>
              <p>Always consult with a qualified attorney for specific legal advice. All rights reserved.</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App