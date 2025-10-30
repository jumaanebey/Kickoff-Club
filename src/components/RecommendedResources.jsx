import React from 'react'
import AffiliateLink from './AffiliateLink'

/**
 * RecommendedResources Component
 *
 * Displays curated affiliate recommendations
 * Can be placed at the end of lessons or on a dedicated resources page
 */
export default function RecommendedResources() {

  const resources = [
    {
      title: 'NFL Game Pass',
      description: 'Watch full game replays and learn from the pros. Perfect for studying plays and strategies.',
      platform: 'NFL',
      url: 'https://www.nfl.com/game-pass', // Replace with your affiliate link
      imageUrl: '/images/nfl-gamepass.jpg', // Add your image
      category: 'streaming'
    },
    {
      title: 'Football for Dummies',
      description: 'The classic beginner guide. Great companion to our lessons with detailed rule explanations.',
      platform: 'Amazon',
      url: 'https://amazon.com/...?tag=YOUR_TAG', // Replace with your Amazon affiliate link
      imageUrl: '/images/football-dummies.jpg',
      category: 'books'
    },
    {
      title: 'Team Jersey',
      description: 'Rep your favorite team! Fanatics has authentic gear for all 32 NFL teams.',
      platform: 'Fanatics',
      url: 'https://fanatics.com/...', // Replace with your Fanatics affiliate link
      imageUrl: '/images/jersey.jpg',
      category: 'gear'
    }
  ]

  return (
    <div className="bg-gradient-to-br from-blush-50 to-primary-50 rounded-3xl p-8 lg:p-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-700
                        px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <span>📚</span>
          <span>Recommended Resources</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-secondary-900 mb-3">
          Take Your Learning Further
        </h2>
        <p className="text-secondary-600 max-w-2xl mx-auto">
          Hand-picked resources to complement your lessons. We may earn a commission from purchases.
        </p>
      </div>

      {/* Resource Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <AffiliateLink
            key={index}
            href={resource.url}
            type="card"
            platform={resource.platform}
            description={resource.description}
            imageUrl={resource.imageUrl}
          >
            {resource.title}
          </AffiliateLink>
        ))}
      </div>

      {/* Disclosure */}
      <div className="mt-8 p-4 bg-white/60 rounded-xl border border-secondary-200">
        <p className="text-xs text-secondary-600 text-center">
          <span className="font-semibold">Affiliate Disclosure:</span> Some links on this page are affiliate links.
          If you make a purchase, we may earn a small commission at no extra cost to you.
          We only recommend products we genuinely believe will help you learn football.
        </p>
      </div>
    </div>
  )
}
