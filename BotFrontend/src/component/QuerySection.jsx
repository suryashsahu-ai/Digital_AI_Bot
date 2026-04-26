import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { useTheme } from "../context/ThemeContext"

const QuerySection = forwardRef(({ onSendMessage }, ref) => {
  const { isDarkMode } = useTheme()
  const [query, setQuery] = useState('')
  const textareaRef = useRef(null)

  // Expose focusInput method to parent component
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (textareaRef.current) {
        textareaRef.current.focus()
      }
    }
  }))

  const handleSend = () => {
    if (query.trim()) {
      const currentQuery = query.trim()
      setQuery('') // Clear input immediately
      onSendMessage(currentQuery)
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleTextareaChange = (e) => {
    setQuery(e.target.value)
    // Auto-resize textarea
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px'
  }

  return (
    <div className="flex-1 flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900 ">
      <div className="w-full max-w-3xl px-4 flex flex-col items-center justify-center">
        {/* Market Ai Bot Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Market Ai Bot
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your digital marketing assistant
          </p>
        </div>
        
        {/* ChatGPT Style Input Field */}
        <form onSubmit={(e) => {
          e.preventDefault()
          handleSend()
        }} className="relative w-full">
          <div className="relative w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus-within:shadow-md focus-within:border-blue-500 transition-all">
            {/* File Button - Left Side */}
            <button
              type="button"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              title="Attach file"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            
            {/* Input Field - Centered */}
            <textarea
              ref={textareaRef}
              value={query}
              onChange={handleTextareaChange}
              onKeyPress={handleKeyPress}
              placeholder="Send a message..."
              className="w-full px-12 py-3 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '200px' }}
            />
            
            {/* Submit Button - Right Side */}
            <button
              type="submit"
              disabled={!query.trim()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
              title="Send message"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
        
        {/* AI Suggestions - Hidden when typing */}
        {query.length === 0 && (
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            {[
              "How to improve SEO rankings?",
              "Best social media strategy",
              "Content marketing tips",
              "Email marketing templates",
              "PPC advertising basics"
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setQuery(suggestion)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})

export default QuerySection