import React from 'react'
export default function Footer(){
  return (
    <footer className="bg-slate-100 text-slate-700 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between">
        <div>© Kickoff Club</div>
        <div className="flex gap-4">
          <a href="/privacy" className="text-sm">Privacy</a>
          <a href="/terms" className="text-sm">Terms</a>
        </div>
      </div>
    </footer>
  )
}
