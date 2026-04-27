import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import QuerySection from './QuerySection'
import { useTheme } from '../context/ThemeContext'
import { chatStorage } from '../utils/chatStorage'

const ChatArea = forwardRef(({ selectedChat = null, isSidebarOpen = false }, ref) => {
  const { isDarkMode } = useTheme()

  useImperativeHandle(ref, () => ({
    startNewChat,
    loadChat
  }))

  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const [conversationCount, setConversationCount] = useState(0)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [currentChatId, setCurrentChatId] = useState(null)

  const predefinedAnswers = {
    "How to improve SEO rankings?": `To improve your SEO rankings, follow these key strategies:

🔍 **On-Page SEO:**
- Optimize title tags and meta descriptions
- Use proper heading structure (H1, H2, H3)
- Include target keywords naturally
- Improve page loading speed
- Make your site mobile-friendly

📝 **Content Strategy:**
- Create high-quality, relevant content
- Use long-tail keywords
- Update content regularly
- Include internal linking

🔗 **Off-Page SEO:**
- Build quality backlinks
- Engage in guest posting
- Use social media promotion
- Get listed in local directories

📊 **Technical SEO:**
- Use SSL certificates
- Create XML sitemaps
- Fix broken links
- Optimize images with alt tags

Would you like me to elaborate on any of these areas?`,

    "Best social media strategy": `Here's a comprehensive social media strategy:

🎯 **Platform Selection:**
- Facebook: Broad audience, community building
- Instagram: Visual content, younger demographics
- LinkedIn: Professional networking, B2B
- Twitter: Real-time updates, news
- TikTok: Short-form video, Gen Z

📅 **Content Planning:**
- Post 3-5 times per week consistently
- Use 80/20 rule (80% value, 20% promotion)
- Create content calendar
- Use hashtags strategically

💡 **Engagement Tactics:**
- Respond to comments within 2 hours
- Run contests and giveaways
- Use polls and questions
- Share user-generated content

📈 **Analytics & Optimization:**
- Track engagement metrics
- Test different posting times
- Use A/B testing for content
- Monitor competitor strategies

Which platform would you like to focus on first?`,

    "Content marketing tips": `Essential content marketing tips for success:

✍️ **Content Creation:**
- Know your target audience deeply
- Create valuable, problem-solving content
- Use storytelling techniques
- Maintain consistent brand voice
- Mix content types (blogs, videos, infographics)

🎯 **Content Strategy:**
- Develop content pillars
- Create content calendar
- Focus on quality over quantity
- Repurpose content across platforms
- Use SEO best practices

📊 **Distribution:**
- Share on social media platforms
- Use email marketing
- Collaborate with influencers
- Guest post on relevant sites
- Use paid promotion strategically

🔍 **Measurement:**
- Track engagement metrics
- Monitor conversion rates
- Analyze audience behavior
- Adjust strategy based on data
- Set clear KPIs

What type of content are you most interested in creating?`,

    "Email marketing templates": `Effective email marketing templates and strategies:

📧 **Welcome Email Template:**
Subject: Welcome to [Company Name]!
Hi [Name],
Thank you for joining us! Here's what you can expect...
[Personalized offer]
Best regards,
[Your Name]

🛍️ **Promotional Email:**
Subject: Exclusive Offer Just for You!
Hi [Name],
We have a special deal for you...
[Product details + CTA]
Shop Now →

📊 **Newsletter Template:**
Subject: [Month] Newsletter - Latest Updates!
Hi [Name],
Here's what's new this month...
[Blog links + Tips]
Read more →

💡 **Best Practices:**
- Personalize subject lines
- Use clear CTAs
- Mobile-responsive design
- Test send times
- Segment your audience
- A/B test subject lines

Would you like specific templates for your industry?`,

    "PPC advertising basics": `PPC Advertising Fundamentals:

🎯 **Google Ads Basics:**
- Start with Search campaigns
- Use relevant keywords
- Write compelling ad copy
- Set realistic budgets
- Monitor Quality Score

💰 **Budget Management:**
- Start small ($10-50/day)
- Focus on high-intent keywords
- Use negative keywords
- Monitor CPC trends
- Adjust bids based on performance

📝 **Ad Copy Best Practices:**
- Include keywords in headlines
- Use emotional triggers
- Add clear CTAs
- Highlight unique selling points
- Use ad extensions

📊 **Tracking & Optimization:**
- Set up conversion tracking
- Use Google Analytics
- Monitor click-through rates
- Test different ad variations
- Optimize landing pages

🔍 **Keyword Strategy:**
- Use long-tail keywords
- Focus on buying intent
- Research competitor keywords
- Use keyword match types
- Regular keyword review

What's your monthly advertising budget?`
  }

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const querySectionRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const formatStructuredResponse = (response) => {
    if (!response) return "## ❌ No Response\n\nI didn't receive any response. Please try again."

    if (response.includes('##') && response.includes('🔍')) return response

    if (response.includes('\n') && (response.includes('•') || response.includes('-') || response.includes('*') || /\d+\./.test(response))) {
      return `## 📋 Detailed Answer

${response}

---

### 🎯 **Key Takeaways**
${extractKeyPoints(response)}

---

**💡 Want to dive deeper?** Ask me about any specific point above!`
    } else if (response.toLowerCase().includes('step') || response.toLowerCase().includes('first') || response.toLowerCase().includes('then')) {
      return `## 🚀 Step-by-Step Guide

${response}

---

### ⚡ **Quick Summary**
${generateQuickSummary(response)}

---

**🔄 Need clarification?** Ask about any specific step!`
    } else {
      return `## 💡 **Expert Answer**

${response}

---

### 🔍 **Related Topics You Might Like**
- • SEO Optimization
- • Social Media Strategy
- • Content Marketing
- • Email Campaigns
- • PPC Advertising

---

**❓ Need more help?** Feel free to ask follow-up questions!`
    }
  }

  const extractKeyPoints = (text) => {
    const lines = text.split('\n').filter(line => line.trim())
    return lines.slice(0, 3).map(line => `• ${line.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '')}`).join('\n')
  }

  const generateQuickSummary = (text) => {
    const sentences = text.split('.').filter(s => s.trim()).slice(0, 2)
    return sentences.map(s => `• ${s.trim()}`).join('\n')
  }

  const checkConversationLimit = () => {
    const newCount = conversationCount + 1
    setConversationCount(newCount)
    if (newCount >= 30) {
      setShowLoginPrompt(true)
      return false
    }
    return true
  }

  const saveCurrentChat = () => {
    if (messages.length === 0) return
    const chatData = {
      id: currentChatId,
      messages,
      timestamp: new Date().toISOString()
    }
    const savedChatId = chatStorage.saveChat(chatData)
    if (savedChatId) setCurrentChatId(savedChatId)
  }

  const startNewChat = () => {
    if (messages.length > 0) saveCurrentChat()
    setMessages([])
    setCurrentChatId(null)
    setChatStarted(false)
    setConversationCount(0)
    setShowLoginPrompt(false)
    setTimeout(() => {
      if (querySectionRef.current?.focusInput) {
        querySectionRef.current.focusInput()
      } else if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }

  const loadChat = (chatId) => {
    const chat = chatStorage.getChatById(chatId)
    if (chat) {
      setMessages(chat.messages)
      setCurrentChatId(chatId)
      setChatStarted(true)
      setConversationCount(chat.messages.filter(msg => msg.type === 'user').length)
    }
  }

  useEffect(() => {
    if (messages.length > 0 && chatStarted) {
      const timeoutId = setTimeout(() => saveCurrentChat(), 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [messages, chatStarted])

  const addToSearchHistory = (query) => {
    const historyItem = {
      id: Date.now(),
      title: query.length > 50 ? query.substring(0, 50) + '...' : query,
    }
    // Add your search history storage logic here if needed
  }

  const handleManualQuery = async (query) => {
    try {
      const res = await fetch("https://digital-ai-bot.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query })
      })

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

      const data = await res.json()
      const reply = data.reply || data.response || data.message || data.choices?.[0]?.message?.content || "No response received"
      const formattedResponse = formatStructuredResponse(reply)

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, type: 'bot', content: formattedResponse, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ])
    } catch (error) {
      const errorMessage = error.message.includes('fetch')
        ? "## 🌐 Connection Error\n\nI can't reach my AI backend. Please make sure the server is running on localhost:5000\n\n**💡 Quick Fix:** Check if the backend server is started!"
        : "## ❌ Server Error\n\nSomething went wrong. Please try again."

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, type: 'bot', content: errorMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ])
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return
    if (!checkConversationLimit()) return

    const currentMessage = inputMessage
    setInputMessage("")

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentMessage })
      })

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

      const data = await res.json()
      const reply = data.reply || data.response || data.message || data.choices?.[0]?.message?.content || "No response received"
      const formattedResponse = formatStructuredResponse(reply)

      setMessages(prev => [
        ...prev,
        { id: Date.now(), type: 'user', content: currentMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { id: Date.now() + 1, type: 'bot', content: formattedResponse, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ])
    } catch (error) {
      const errorMessage = error.message.includes('fetch')
        ? "## 🌐 Connection Error\n\nI can't reach my AI backend. Please make sure the server is running on localhost:5000\n\n**💡 Quick Fix:** Check if the backend server is started!"
        : "## ❌ Server Error\n\nSomething went wrong. Please try again."

      setMessages(prev => [
        ...prev,
        { id: Date.now(), type: 'user', content: currentMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { id: Date.now() + 1, type: 'bot', content: errorMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ])
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleQueryMessage = (query) => {
    setChatStarted(true)

    if (!checkConversationLimit()) {
      setChatStarted(false)
      return
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    if (predefinedAnswers[query]) {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: predefinedAnswers[query],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([userMessage, botMessage])
      addToSearchHistory(query)
    } else {
      setMessages([userMessage])
      addToSearchHistory(query)
      handleManualQuery(query)
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 space-y-3">
        {!chatStarted ? (
          <QuerySection
            ref={querySectionRef}
            onSendMessage={handleQueryMessage}
          />
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-sm'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
     {chatStarted && ( <div className="shrink-0 px-2 flex justify-center sm:px-4  border-t bg-white   dark:bg-transparent">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage() }} className="relative w-[70%]">
          <div className="relative bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg focus-within:shadow-xl focus-within:border-blue-500 transition-all">
            {/* Attach Button */}
            <button
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              title="Attach file"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>

            {/* Textarea */}
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="w-full min-h-11 text-sm sm:text-base bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none pl-12 pr-12 py-3"
              rows={1}
              style={{ maxHeight: '200px' }}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 min-h-11 flex items-center justify-center p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
              title="Send message"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>)}
    </div>
  )
})

export default ChatArea
