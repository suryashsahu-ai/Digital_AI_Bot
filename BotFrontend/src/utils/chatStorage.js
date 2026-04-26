// Chat storage utility for managing conversation history

const CHAT_STORAGE_KEY = 'chatbot_history'
const MAX_CHATS = 50

export const chatStorage = {
  // Save a chat to localStorage
  saveChat(chatData) {
    try {
      const existingChats = this.getAllChats()
      
      // Create new chat object
      const newChat = {
        id: chatData.id || Date.now().toString(),
        title: chatData.title || 'New Chat',
        messages: chatData.messages || [],
        timestamp: chatData.timestamp || new Date().toISOString(),
        lastMessage: chatData.lastMessage || ''
      }

      // Remove existing chat with same ID if it exists
      const filteredChats = existingChats.filter(chat => chat.id !== newChat.id)
      
      // Add new chat at the beginning
      const updatedChats = [newChat, ...filteredChats]

      // Limit to MAX_CHATS
      const limitedChats = updatedChats.slice(0, MAX_CHATS)

      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(limitedChats))
      
      // Dispatch custom event to notify components
      window.dispatchEvent(new CustomEvent('chatSaved', { detail: newChat }))
      
      return newChat.id
    } catch (error) {
      console.error('Error saving chat:', error)
      return null
    }
  },

  // Get all saved chats
  getAllChats() {
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading chats:', error)
      return []
    }
  },

  // Get a specific chat by ID
  getChatById(chatId) {
    try {
      const chats = this.getAllChats()
      return chats.find(chat => chat.id === chatId) || null
    } catch (error) {
      console.error('Error getting chat by ID:', error)
      return null
    }
  },

  // Delete a chat by ID
  deleteChat(chatId) {
    try {
      const chats = this.getAllChats()
      const filteredChats = chats.filter(chat => chat.id !== chatId)
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(filteredChats))
      return true
    } catch (error) {
      console.error('Error deleting chat:', error)
      return false
    }
  },

  // Clear all chat history
  clearAllChats() {
    try {
      localStorage.removeItem(CHAT_STORAGE_KEY)
      return true
    } catch (error) {
      console.error('Error clearing chats:', error)
      return false
    }
  },

  // Generate chat title from first user message
  generateTitle(messages) {
    const firstUserMessage = messages.find(msg => msg.type === 'user')
    if (!firstUserMessage) return 'New Chat'
    
    const content = firstUserMessage.content
    const title = content.length > 50 ? content.substring(0, 50) + '...' : content
    return title
  },

  // Get last message from chat
  getLastMessage(messages) {
    if (!messages || messages.length === 0) return ''
    const lastMessage = messages[messages.length - 1]
    const content = lastMessage.content.length > 100 ? lastMessage.content.substring(0, 100) + '...' : lastMessage.content
    return content
  },

  // Format timestamp for display
  formatTimestamp(timestamp) {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    
    return date.toLocaleDateString()
  }
}
