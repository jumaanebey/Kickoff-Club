import React, { useState } from 'react'
import BackupRestore from './BackupRestore'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [showBackup, setShowBackup] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Connect to newsletter service (Mailchimp, ConvertKit, etc.)
    console.log('Newsletter signup:', email)
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="bg-gradient-to-br from-secondary-100 to-secondary-200 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Newsletter Section */}
        <div className="mb-10 text-center">
          <h3 className="text-2xl font-bold mb-2">Stay in the Game 🏈</h3>
          <p className="text-white/80 mb-6">Get new lessons and football tips delivered to your inbox</p>

          {subscribed ? (
            <div className="max-w-md mx-auto p-4 bg-green-500/20 border border-green-300 rounded-xl">
              <p className="text-green-100 font-medium">✓ You're subscribed! Check your email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-xl text-secondary-100 border-2 border-white/20 focus:border-blush-400 focus:outline-none focus:ring-2 focus:ring-blush-200 bg-white/10 placeholder-white/60"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blush-500 text-white rounded-xl hover:bg-blush-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Footer Links */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <span className="font-display font-bold text-xl">Kickoff Club</span>
            </div>

            <div className="flex gap-6 text-sm">
              <button onClick={() => setShowBackup(true)} className="text-white/80 hover:text-white transition-colors">
                Backup Progress
              </button>
              <a href="/privacy" className="text-white/80 hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="text-white/80 hover:text-white transition-colors">Terms</a>
              <a href="mailto:hello@kickoffclub.com" className="text-white/80 hover:text-white transition-colors">Contact</a>
            </div>

            <div className="flex gap-4">
              <a href="https://twitter.com/kickoffclub" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://facebook.com/kickoffclub" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-white/60">
            © 2025 Kickoff Club. Made with 💜 for football learners everywhere.
          </div>
        </div>
      </div>

      {/* Backup/Restore Modal */}
      {showBackup && <BackupRestore onClose={() => setShowBackup(false)} />}
    </footer>
  )
}
