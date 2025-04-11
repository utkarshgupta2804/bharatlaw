"use client"

import { useRef, useEffect, useState } from "react"
import { ArrowLeft, Send, AlertTriangle } from "lucide-react"

function ChatInterface({ onBack }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
    }

    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Send POST request to the backend
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      const aiResponse = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.response,
      }
      
      setMessages((prevMessages) => [...prevMessages, aiResponse])
    } catch (error) {
      console.error("Error getting response:", error)
      
      // Add error message
      const errorResponse = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Sorry, I encountered an error processing your request. Please try again later.",
      }
      
      setMessages((prevMessages) => [...prevMessages, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-800">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-800 mr-4">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Legal Advisor AI</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-2xl font-bold mb-6">Welcome to Legal Advisor AI</h2>
            <p className="text-gray-400 max-w-md mb-8">
              Describe your legal situation or concern, and I'll provide information to help you understand your
              options.
            </p>
            <div className="bg-gray-800 p-4 rounded-lg max-w-md mb-4 flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-500 mt-1 flex-shrink-0" />
              <p className="text-sm text-gray-300">
                Remember that this AI provides general legal information, not legal advice. Always consult with a
                qualified attorney for specific legal advice.
              </p>
            </div>
            <p className="text-gray-400 text-sm">Example: "I received a speeding ticket. What are my options?"</p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-3/4 rounded-lg p-4 ${
                    message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-3/4 rounded-lg p-4 bg-gray-800 text-white">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Describe your legal situation..."
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`bg-blue-600 ${!isLoading && input.trim() ? "hover:bg-blue-700" : "opacity-50"} text-white p-3 rounded-lg`}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface