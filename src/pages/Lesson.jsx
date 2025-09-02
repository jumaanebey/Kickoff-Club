import React, { useEffect, useState } from 'react'
import { lessons } from '../data/lessons'
import Quiz from '../components/Quiz'
import { trackEvent } from '../analytics'

export default function Lesson({ params }) {
  const id = (typeof params === 'string') ? params : (params?.id || window.location.pathname.split('/').pop())
  const lesson = lessons.find(l => l.id === id)
  const [passed, setPassed] = useState(false)
  useEffect(()=> {
    if (lesson) trackEvent('lesson_started', { lesson: lesson.id })
  }, [lesson])

  if (!lesson) return <div className="p-8">Lesson not found</div>

  function onPass() {
    setPassed(true)
    localStorage.setItem(`badge_${lesson.id}`, 'first-play-expert')
    trackEvent('lesson_completed', { lesson: lesson.id, status: 'passed' })
    alert('Congrats — you earned the First-Play badge! Share it with friends.')
  }

  function mockPurchase() {
    trackEvent('course_purchased', { sku: 'crash-course', price: 29, method: 'mock' })
    // simulate purchase delay - using DOM creation for prototype
    const modal = document.createElement('div')
    modal.innerHTML = '<div style="position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);"><div style="background:white;padding:20px;border-radius:8px;text-align:center;">Processing…<div style="height:12px"></div></div></div>'
    document.body.appendChild(modal)
    setTimeout(()=> {
      document.body.removeChild(modal)
      alert('Mock purchase successful — thank you!')
    }, 2000)
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold">{lesson.title}</h1>
      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <div>
          <video controls crossOrigin="anonymous" aria-label={lesson.title} className="w-full rounded-md">
            <source src={lesson.video} type="video/mp4" />
            <track src={lesson.captions} kind="captions" srcLang="en" label="English captions" default />
          </video>
          <div className="mt-3 text-sm text-slate-600">Duration: {lesson.duration}s</div>
        </div>
        <div>
          <h3 className="font-semibold">What you’ll learn</h3>
          <p className="text-sm text-slate-700 mt-2">{lesson.transcript}</p>
          <div className="mt-4">
            <h4 className="font-semibold">Storyboard</h4>
            <ul className="list-disc list-inside mt-2 text-sm text-slate-700">
              {lesson.storyboard.map((s,i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <Quiz quiz={lesson.quiz} onPass={onPass} />
      <div className="mt-6">
        <button className="px-4 py-2 bg-gold text-navy rounded" onClick={()=>{trackEvent('share_clicked',{lesson: lesson.id, channel:'copy'}); navigator.clipboard.writeText(window.location.href).then(()=>alert('Link copied to clipboard'))}}>Share Badge</button>
        <button className="ml-3 px-4 py-2 border rounded" onClick={mockPurchase}>Buy Crash Course ($29)</button>
      </div>
    </main>
  )
}
