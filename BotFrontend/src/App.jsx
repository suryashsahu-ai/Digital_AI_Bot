import React, { useState, useRef, useEffect } from 'react'
import Sidebar from './component/Sidebar'
import ChatArea from './component/ChatArea'
import Header from './component/Header'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [selectedChat, setSelectedChat] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const chatAreaRef = useRef(null)

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Mobile: sidebar hidden by default
        setIsSidebarOpen(false)
      } else {
        // Desktop: sidebar visible by default
        setIsSidebarOpen(true)
      }
    }

    // Set initial state based on screen size
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNewChat = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.startNewChat()
    }
    // Clear selected chat to deselect previous history item
    setSelectedChat(null)
  }

  const handleLoadChat = (chatId) => {
    if (chatAreaRef.current) {
      chatAreaRef.current.loadChat(chatId)
    }
    setSelectedChat(chatId)
  }

  return (
    <ThemeProvider>
      <div className='flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
        {/* Header - Spans full width */}
        <div className='absolute top-0 left-0 right-0 z-50'>
          <Header 
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
        
        {/* Body Row (below navbar) */}
        <div className='flex flex-1 overflow-hidden relative pt-14'>
          {/* Sidebar - Desktop always visible, mobile hidden by default, slides in as overlay drawer */}
          <div className={`
            fixed lg:static top-14 left-0 z-40 h-[calc(100vh-56px)]
            w-64 shrink-0 flex flex-col
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
          `}>
            <Sidebar 
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              onNewChat={handleNewChat}
              onLoadChat={handleLoadChat}
            />
          </div>
          
          {/* Sidebar Overlay (mobile backdrop) */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          
          {/* Main Chat Area */}
          <div className='flex flex-col flex-1 overflow-hidden'>
            {/* Chat Area - Takes remaining height */}
            <div className='flex-1 relative overflow-hidden'>
              <ChatArea 
                ref={chatAreaRef}
                selectedChat={selectedChat}
                isSidebarOpen={isSidebarOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App