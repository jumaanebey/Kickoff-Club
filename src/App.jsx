import React from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import SimpleLessonPage from './pages/SimpleLessonPage'
import LessonsPage from './pages/LessonsPage'
import ProfilePage from './pages/ProfilePage'

function Router() {
  const path = window.location.pathname
  
  if (path.startsWith('/lesson/')) {
    return <SimpleLessonPage />
  }
  if (path === '/lessons') {
    return <LessonsPage />
  }
  if (path === '/profile') {
    return <ProfilePage />
  }
  
  return <Home />
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow">
        <Router />
      </div>
      <Footer />
    </div>
  )
}
