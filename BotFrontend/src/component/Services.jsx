import React, { useState } from 'react'
import QuerySection from './QuerySection'

const Services = ({ onServiceSelect, onSuggestionClick, onSendMessage }) => {
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    {
      id: 1,
      title: 'SEO Optimization',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      description: 'Boost your website visibility and rank higher in search results',
      suggestions: [
        'Keyword Research and Analysis',
        'On-Page SEO Optimization',
        'Technical SEO Audit',
        'Content Strategy for SEO',
        'Local SEO Optimization',
        'Backlink Building Strategy'
      ]
    },
    {
      id: 2,
      title: 'Social Media Marketing',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
      description: 'Build your brand presence and engage with your audience',
      suggestions: [
        'Social Media Strategy Development',
        'Content Creation & Scheduling',
        'Community Management',
        'Social Media Advertising',
        'Influencer Marketing',
        'Analytics & Reporting'
      ]
    },
    {
      id: 3,
      title: 'Content Marketing',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
      description: 'Create valuable content that attracts and converts customers',
      suggestions: [
        'Blog Content Strategy',
        'Video Content Creation',
        'Infographic Design',
        'E-book Development',
        'Case Study Creation',
        'Content Distribution Plan'
      ]
    },
    {
      id: 4,
      title: 'Email Marketing',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-orange-500 to-orange-600',
      description: 'Nurture leads and build customer relationships through email',
      suggestions: [
        'Email Campaign Strategy',
        'Newsletter Design & Content',
        'Automated Email Sequences',
        'A/B Testing for Emails',
        'List Building & Segmentation',
        'Email Analytics & Optimization'
      ]
    },
    {
      id: 5,
      title: 'PPC Advertising',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-red-500 to-red-600',
      description: 'Drive immediate traffic and conversions with paid ads',
      suggestions: [
        'Google Ads Campaign Setup',
        'Facebook & Instagram Ads',
        'LinkedIn Advertising',
        'Retargeting Campaigns',
        'Ad Copy & Creative Development',
        'Campaign Optimization & ROI Tracking'
      ]
    },
    {
      id: 6,
      title: 'Web Analytics',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'from-indigo-500 to-indigo-600',
      description: 'Track, measure, and optimize your marketing performance',
      suggestions: [
        'Google Analytics Setup',
        'Conversion Tracking',
        'Custom Dashboard Creation',
        'A/B Testing Analysis',
        'ROI Measurement',
        'Marketing Attribution Modeling'
      ]
    }
  ]

  const handleServiceClick = (service) => {
    setSelectedService(service)
    setShowQueryOnly(true)
    if (onServiceSelect) {
      onServiceSelect(service)
    }
  }

  const handleSuggestionClick = (suggestion, service) => {
    setShowQueryOnly(true)
    if (onSuggestionClick) {
      onSuggestionClick(suggestion, service)
    }
  }

  const handleQueryFocus = () => {
    setShowQueryOnly(true)
  }

  const handleSendMessage = (query, files) => {
    if (onSendMessage) {
      onSendMessage(query, files)
    }
    setShowQueryOnly(true)
  }

  return (
    <div className='w-full max-w-6xl mx-auto p-6'>
      {/* Query Section - Always Visible */}
      <QuerySection 
        onSendMessage={handleSendMessage}
        isVisible={true}
        onQueryFocus={handleQueryFocus}
      />

      {/* Services Section - Hidden when showQueryOnly is true */}
      {!showQueryOnly && (
        <>
          <div className='text-center mb-10 mt-8'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>Our Digital Marketing Services</h2>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
              Choose a service below to get expert suggestions and tailored strategies for your business growth
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => handleServiceClick(service)}
            className={`bg-white rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
              selectedService?.id === service.id 
                ? 'border-blue-500 shadow-lg transform scale-105' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className='p-6'>
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                {service.icon}
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>{service.title}</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>{service.description}</p>
              <div className='mt-4 flex items-center text-blue-500 font-medium text-sm'>
                <span>View suggestions</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className='bg-white rounded-xl border border-gray-200 p-6 shadow-lg'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <div className={`w-12 h-12 bg-gradient-to-r ${selectedService.color} rounded-lg flex items-center justify-center text-white`}>
                {selectedService.icon}
              </div>
              <div>
                <h3 className='text-2xl font-bold text-gray-800'>{selectedService.title}</h3>
                <p className='text-gray-600'>Click on any suggestion to start a conversation</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedService(null)}
              className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {selectedService.suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion, selectedService)}
                className='p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all group'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors'>
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className='text-gray-700 font-medium'>{suggestion}</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200'>
            <p className='text-sm text-gray-700'>
              <span className='font-semibold text-blue-600'>💡 Pro Tip:</span> 
              {` Start with "${selectedService.suggestions[0]}" to get comprehensive insights about ${selectedService.title.toLowerCase()} strategies tailored to your business needs.`}
            </p>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  )
}

export default Services
