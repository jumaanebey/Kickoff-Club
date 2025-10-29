import React from 'react'
import { getCheckoutUrl, WHOP_CONFIG } from '../config/whop'

const PremiumPaywall = ({ lessonTitle }) => {
  const handleUnlockClick = () => {
    window.open(getCheckoutUrl(), '_blank')
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      padding: '48px 24px',
      textAlign: 'center',
      color: 'white',
      maxWidth: '600px',
      margin: '40px auto'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>

      <h2 style={{
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '12px',
        color: 'white'
      }}>
        Premium Lesson
      </h2>

      <p style={{
        fontSize: '18px',
        marginBottom: '24px',
        opacity: 0.9,
        lineHeight: 1.6
      }}>
        "{lessonTitle}" is a premium lesson. Unlock all 10 lessons for lifetime access.
      </p>

      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ fontSize: '16px', opacity: 0.9, marginBottom: '12px' }}>
          ✨ Get instant access to:
        </div>
        <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ marginBottom: '8px' }}>✓ All 10 comprehensive video lessons</div>
          <div style={{ marginBottom: '8px' }}>✓ Interactive quizzes & progress tracking</div>
          <div style={{ marginBottom: '8px' }}>✓ Lifetime access to all content</div>
          <div style={{ marginBottom: '8px' }}>✓ All future updates included</div>
          <div>✓ Learn at your own pace</div>
        </div>
      </div>

      <button
        onClick={handleUnlockClick}
        style={{
          background: 'white',
          color: '#667eea',
          border: 'none',
          borderRadius: '8px',
          padding: '16px 48px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease',
          marginBottom: '12px'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)'
          e.target.style.boxShadow = '0 6px 20px 0 rgba(0, 0, 0, 0.15)'
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)'
          e.target.style.boxShadow = '0 4px 14px 0 rgba(0, 0, 0, 0.1)'
        }}
      >
        Unlock All Lessons - ${WHOP_CONFIG.price}
      </button>

      <div style={{ fontSize: '14px', opacity: 0.8 }}>
        One-time payment • Lifetime access • 30-day money-back guarantee
      </div>

      <div style={{ marginTop: '24px', fontSize: '14px', opacity: 0.7 }}>
        Already purchased? <a href="#" style={{ color: 'white', textDecoration: 'underline' }} onClick={(e) => {
          e.preventDefault()
          alert('Please refresh the page after completing your purchase.')
        }}>Click here</a> to refresh
      </div>
    </div>
  )
}

export default PremiumPaywall
