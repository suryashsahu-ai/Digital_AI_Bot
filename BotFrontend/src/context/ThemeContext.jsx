import React, { createContext, useState, useEffect, useContext } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    
    // Update document class for Tailwind dark mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      background: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
      surface: isDarkMode ? 'bg-gray-800' : 'bg-white',
      surfaceHover: isDarkMode ? 'bg-gray-700' : 'bg-gray-100',
      border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
      text: {
        primary: isDarkMode ? 'text-gray-100' : 'text-gray-800',
        secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
        tertiary: isDarkMode ? 'text-gray-400' : 'text-gray-500',
        inverse: isDarkMode ? 'text-gray-800' : 'text-gray-100'
      },
      gradient: {
        primary: isDarkMode 
          ? 'from-blue-600 to-purple-700' 
          : 'from-blue-500 to-purple-600',
        secondary: isDarkMode
          ? 'from-gray-700 to-gray-800'
          : 'from-gray-50 to-white'
      }
    }
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext

