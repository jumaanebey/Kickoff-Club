import React, { useState } from 'react'
import { getCheckoutUrl, WHOP_CONFIG } from '../config/whop'
import { useApp } from '../context/AppContext'

const PremiumPaywall = ({ lessonTitle }) => {
  const { actions } = useApp()
  const [verifying, setVerifying] = useState(false)
  const [verificationMessage, setVerificationMessage] = useState('')

  const handleUnlockClick = () => {
    window.open(getCheckoutUrl(), '_blank')
  }

  const handleVerifyPurchase = () => {
    setVerifying(true)
    setVerificationMessage('')

    // Wait a moment for better UX
    setTimeout(() => {
      const purchased = actions.verifyPurchase()

      if (purchased) {
        setVerificationMessage('✅ Premium access verified! Refreshing...')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        setVerificationMessage('❌ No purchase found. Complete checkout first, then click here.')
        setVerifying(false)
      }
    }, 500)
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
      borderRadius: '24px',
      padding: '40px 24px',
      textAlign: 'center',
      color: 'white',
      maxWidth: '700px',
      margin: '20px auto',
      boxShadow: '0 20px 60px rgba(147, 51, 234, 0.3)'
    }}>
      <div style={{ fontSize: 'clamp(48px, 12vw, 64px)', marginBottom: '24px' }}>🔒</div>

      <h2 style={{
        fontSize: 'clamp(24px, 6vw, 36px)',
        fontWeight: '800',
        marginBottom: '16px',
        color: 'white'
      }}>
        Unlock "{lessonTitle}"
      </h2>

      <p style={{
        fontSize: 'clamp(16px, 4vw, 20px)',
        marginBottom: '24px',
        opacity: 0.95,
        lineHeight: 1.6,
        padding: '0 12px',
        fontWeight: '500'
      }}>
        Get instant access to all 10 lessons + quizzes + lifetime updates for just $24
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
          padding: '14px 24px',
          fontSize: 'clamp(15px, 3.5vw, 18px)',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease',
          marginBottom: '12px',
          width: '100%',
          maxWidth: '320px'
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

      <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '12px' }}>
        ✨ One-time payment • 💎 Lifetime access • 🔄 30-day guarantee
      </div>

      <div style={{
        marginTop: '20px',
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        fontSize: '14px'
      }}>
        <p style={{ marginBottom: '8px', fontWeight: '600' }}>💡 Value Comparison:</p>
        <p style={{ opacity: 0.9 }}>📺 Netflix: $16/month • ☕ Starbucks: $6/drink • 🏈 Kickoff Club: $24 forever</p>
      </div>

      <div style={{ marginTop: '24px', fontSize: '14px', opacity: 0.7 }}>
        Already purchased? <button
          onClick={handleVerifyPurchase}
          disabled={verifying}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            textDecoration: 'underline',
            cursor: verifying ? 'wait' : 'pointer',
            fontSize: '14px',
            padding: 0
          }}
        >
          {verifying ? 'Verifying...' : 'Click here to verify'}
        </button>
      </div>

      {verificationMessage && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          borderRadius: '8px',
          background: verificationMessage.includes('✅') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          color: 'white',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {verificationMessage}
        </div>
      )}
    </div>
  )
}

export default PremiumPaywall
