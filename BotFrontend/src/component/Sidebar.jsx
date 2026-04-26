import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { chatStorage } from '../utils/chatStorage'

const Sidebar = ({ selectedChat, setSelectedChat, isSidebarOpen, setIsSidebarOpen, onNewChat, onLoadChat }) => {
  const { isDarkMode } = useTheme()
  const [chatHistory, setChatHistory] = useState([])

  // Load chat history on component mount and refresh when needed
  useEffect(() => {
    const loadChatHistory = () => {
      const savedChats = chatStorage.getAllChats()
      setChatHistory(savedChats)
    }
    
    loadChatHistory()
    
    // Listen for storage changes and custom events
    const handleStorageChange = () => {
      loadChatHistory()
    }
    
    const handleChatSaved = () => {
      loadChatHistory()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('chatSaved', handleChatSaved)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('chatSaved', handleChatSaved)
    }
  }, [])

  const createNewChat = () => {
    if (onNewChat) {
      onNewChat()
    }
  }

  const deleteChat = (chatId, e) => {
    e.stopPropagation()
    chatStorage.deleteChat(chatId)
    setChatHistory(chatHistory.filter(chat => chat.id !== chatId))
    if (selectedChat?.id === chatId) {
      setSelectedChat(null)
    }
  }

  const handleChatClick = (chatId) => {
    if (onLoadChat) {
      onLoadChat(chatId)
    }
  }


  return (
    <aside className={`
      fixed lg:static 
  top-14 left-0 z-40 
  h-[calc(100vh-56px)]
  w-64 flex flex-col
  transform transition-transform duration-300
  bg-gray-800 border-r border-gray-700
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
      ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
    } border-r`}>
      <div className={`p-4 border-b ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      } transition-colors duration-300`}>
        <div className='flex items-center justify-between mb-4'>
          <h2 className={`text-lg font-semibold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-800'
          } transition-colors duration-300`}>Chat History</h2>
          {/* Close button - visible on both mobile and desktop */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className={`p-2 ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            } rounded-lg transition-colors`}
          >
            <svg className={`w-5 h-5 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } transition-colors duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
                
        <div className='flex gap-10'>
          <button
            onClick={createNewChat}
            className='px-4 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all'
          >
            New Chat
          </button>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto'>
        <div className='p-2'>
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all mb-1 group ${
                selectedChat === chat.id 
                  ? isDarkMode 
                    ? 'bg-linear-to-r from-blue-900 to-purple-900 border border-blue-700' 
                    : 'bg-linear-to-r from-blue-50 to-purple-50 border border-blue-200'
                  : isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-50'
              } transition-colors duration-300`}
            >
              <div className='flex items-start justify-between'>
                <div className='flex-1 min-w-0'>
                  <h3 className={`font-medium truncate text-sm ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-800'
                  } transition-colors duration-300`}>
                    {chatStorage.generateTitle(chat.messages)}
                  </h3>
                  <p className={`text-xs truncate mt-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  } transition-colors duration-300`}>
                    {chatStorage.getLastMessage(chat.messages)}
                  </p>
                  <div className='flex items-center gap-2 mt-2'>
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-500'
                    } transition-colors duration-300`}>
                      {chatStorage.formatTimestamp(chat.timestamp)}
                    </span>
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    } transition-colors duration-300`}>
                      {chat.messages.length} messages
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => deleteChat(chat.id, e)}
                  className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${
                    isDarkMode ? 'hover:bg-red-900' : 'hover:bg-red-100'
                  }`}
                >
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-4 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      } transition-colors duration-300`}>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-linear-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center'>
            <span className='text-white text-sm font-medium'>U</span>
          </div>
          <div className='flex-1'>
            <p className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            } transition-colors duration-300`}>User</p>
            <p className={`text-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            } transition-colors duration-300`}>Free Plan</p>
          </div>
          <button className={`p-1 ${
            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          } rounded-lg transition-colors`}>
            <svg className={`w-4 h-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } transition-colors duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
