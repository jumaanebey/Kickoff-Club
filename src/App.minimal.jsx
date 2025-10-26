import React, { useState, useEffect } from 'react'

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  
  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
  
  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  
  const getContent = () => {
    console.log('Current path:', currentPath)
    
    if (currentPath === '/') {
      return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h1>Welcome to Professional Football Learning!</h1>
          <p>This is the home page. Navigation is working!</p>
          <p>Debug: Path is "{currentPath}"</p>
        </div>
      )
    }
    if (currentPath === '/lessons') {
      return (
        <div style={{ padding: '40px' }}>
          <h1>Lessons</h1>
          <p>This is the lessons page. Navigation is working!</p>
          <p>Debug: Path is "{currentPath}"</p>
        </div>
      )
    }
    if (currentPath === '/assessment') {
      return (
        <div style={{ padding: '40px' }}>
          <h1>Assessment</h1>
          <p>This is the assessment page. Navigation is working!</p>
          <p>Debug: Path is "{currentPath}"</p>
        </div>
      )
    }
    return (
      <div style={{ padding: '40px' }}>
        <h1>Page Not Found</h1>
        <p>Debug: Path is "{currentPath}"</p>
        <p>Expected one of: /, /lessons, /assessment</p>
      </div>
    )
  }
  
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9f9f9' }}>
      <nav style={{ padding: '20px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '24px' }}>⚡ Kickoff Club</span>
          <button 
            onClick={() => navigate('/')} 
            style={{ 
              padding: '10px', 
              backgroundColor: currentPath === '/' ? '#007bff' : '#ccc', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/lessons')} 
            style={{ 
              padding: '10px', 
              backgroundColor: currentPath === '/lessons' ? '#007bff' : '#ccc', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Lessons
          </button>
          <button 
            onClick={() => navigate('/assessment')} 
            style={{ 
              padding: '10px', 
              backgroundColor: currentPath === '/assessment' ? '#007bff' : '#ccc', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Assessment
          </button>
        </div>
      </nav>
      
      <main style={{ flex: 1, minHeight: '400px' }}>
        {getContent()}
      </main>
      
      <footer style={{ padding: '20px', textAlign: 'center', backgroundColor: '#333', color: 'white' }}>
        © 2024 Kickoff Club - Testing Navigation
      </footer>
    </div>
  )
}