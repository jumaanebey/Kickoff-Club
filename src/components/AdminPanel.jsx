import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { adminUnlock, getPurchaseInfo, clearPurchaseStatus } from '../utils/purchaseVerification'

const AdminPanel = () => {
  const { state, actions } = useApp()
  const [showPanel, setShowPanel] = useState(false)
  const [secretKey, setSecretKey] = useState('')
  const [message, setMessage] = useState('')

  const purchaseInfo = getPurchaseInfo()

  const handleAdminUnlock = () => {
    const success = adminUnlock(secretKey)
    if (success) {
      actions.verifyPurchase()
      setMessage('✅ Admin unlock successful! Refreshing...')
      setTimeout(() => window.location.reload(), 1000)
    } else {
      setMessage('❌ Invalid admin key')
    }
  }

  const handleClearPurchase = () => {
    clearPurchaseStatus()
    actions.setPurchase(false)
    setMessage('🧹 Purchase cleared! Refreshing...')
    setTimeout(() => window.location.reload(), 1000)
  }

  const handleManualUnlock = () => {
    actions.setPurchase(true)
    setMessage('✅ Manually unlocked! Refreshing...')
    setTimeout(() => window.location.reload(), 1000)
  }

  // Toggle with keyboard shortcut: Ctrl + Shift + A
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowPanel(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  if (!showPanel) {
    return (
      <button
        onClick={() => setShowPanel(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '20px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 9999
        }}
        title="Admin Panel (Ctrl+Shift+A)"
      >
        🔧
      </button>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'white',
      border: '2px solid #6366f1',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      zIndex: 9999,
      minWidth: '300px',
      maxWidth: '400px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>
          🔧 Admin Panel
        </h3>
        <button
          onClick={() => setShowPanel(false)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ marginBottom: '16px', padding: '12px', background: '#f3f4f6', borderRadius: '8px' }}>
        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>Purchase Status:</div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: purchaseInfo.hasPurchased ? '#10b981' : '#ef4444' }}>
          {purchaseInfo.hasPurchased ? '✅ Premium Access' : '❌ Free User'}
        </div>
        {purchaseInfo.purchaseDate && (
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
            Purchased: {new Date(purchaseInfo.purchaseDate).toLocaleDateString()}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
          Admin Key:
        </label>
        <input
          type="password"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="Enter admin key"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            fontSize: '14px'
          }}
        />
        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>
          Hint: kickoff-club-2024
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
        <button
          onClick={handleAdminUnlock}
          style={{
            padding: '10px',
            background: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🔓 Admin Unlock
        </button>

        <button
          onClick={handleManualUnlock}
          style={{
            padding: '10px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          ✅ Manual Unlock (No Key)
        </button>

        <button
          onClick={handleClearPurchase}
          style={{
            padding: '10px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          🧹 Clear Purchase
        </button>
      </div>

      {message && (
        <div style={{
          padding: '8px',
          background: message.includes('✅') ? '#d1fae5' : '#fee2e2',
          color: message.includes('✅') ? '#065f46' : '#991b1b',
          borderRadius: '6px',
          fontSize: '12px',
          marginTop: '12px'
        }}>
          {message}
        </div>
      )}

      <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
        Keyboard shortcut: Ctrl + Shift + A
      </div>
    </div>
  )
}

export default AdminPanel
