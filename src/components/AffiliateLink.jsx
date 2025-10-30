import React from 'react'

/**
 * AffiliateLink Component
 *
 * Displays affiliate links with proper disclosure
 * Tracks clicks for analytics
 *
 * @param {string} href - The affiliate URL
 * @param {string} children - Link text
 * @param {string} platform - Platform name (Amazon, ESPN+, etc)
 * @param {string} type - Link style: 'inline', 'button', 'card'
 */
export default function AffiliateLink({
  href,
  children,
  platform = 'partner',
  type = 'inline',
  description = '',
  imageUrl = ''
}) {

  const trackClick = () => {
    // Track affiliate click for analytics
    if (window.gtag) {
      window.gtag('event', 'affiliate_click', {
        platform: platform,
        link_text: children,
        destination_url: href
      })
    }
  }

  // Inline link (within text)
  if (type === 'inline') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        onClick={trackClick}
        className="text-accent-600 hover:text-accent-700 underline font-medium"
        title={`Affiliate link to ${platform}`}
      >
        {children}
      </a>
    )
  }

  // Button style
  if (type === 'button') {
    return (
      <div className="inline-flex flex-col gap-1">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={trackClick}
          className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600
                     text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          {children}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <span className="text-xs text-secondary-500">
          Affiliate link - We may earn a commission
        </span>
      </div>
    )
  }

  // Card style (for product recommendations)
  if (type === 'card') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        onClick={trackClick}
        className="block bg-white border-2 border-primary-200 rounded-2xl p-6
                   hover:border-accent-400 transition-colors group"
      >
        {imageUrl && (
          <div className="mb-4 rounded-xl overflow-hidden">
            <img
              src={imageUrl}
              alt={children}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        )}

        <h4 className="font-bold text-secondary-900 text-lg mb-2 group-hover:text-accent-600">
          {children}
        </h4>

        {description && (
          <p className="text-secondary-600 text-sm mb-4">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-accent-600 font-semibold text-sm">
            View on {platform} →
          </span>
          <span className="text-xs text-secondary-400">
            Affiliate link
          </span>
        </div>
      </a>
    )
  }
}
