import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { getCurrentUser, updateUserProgress } from '../utils/userAccountSystem'

export default function DiscussionForums() {
  const { state } = useApp()
  const [user, setUser] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [forums, setForums] = useState([])
  const [selectedForum, setSelectedForum] = useState(null)
  const [posts, setPosts] = useState([])
  const [showNewTopicModal, setShowNewTopicModal] = useState(false)
  const [newTopic, setNewTopic] = useState({ title: '', content: '', category: 'general' })
  const [replyContent, setReplyContent] = useState('')
  const [showReplyForm, setShowReplyForm] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    loadForumData()
  }, [])

  const loadForumData = async () => {
    setLoading(true)
    
    // Simulate loading forum data
    setTimeout(() => {
      setForums(generateForumsData())
      setLoading(false)
    }, 800)
  }

  const loadForumPosts = async (forumId) => {
    setLoading(true)
    const forum = forums.find(f => f.id === forumId)
    if (forum) {
      setTimeout(() => {
        setPosts(generatePostsData(forumId))
        setSelectedForum(forum)
        setLoading(false)
      }, 500)
    }
  }

  const generateForumsData = () => [
    {
      id: 'general',
      title: '💬 General Discussion',
      description: 'General football talk, questions, and conversations',
      category: 'general',
      topicsCount: 1247,
      postsCount: 8934,
      lastActivity: {
        user: 'footballFanatic2024',
        time: '2 minutes ago',
        topic: 'Best rookie performances this season?'
      },
      isSticky: true
    },
    {
      id: 'rules-questions',
      title: '❓ Rules & Regulations',
      description: 'Ask questions about football rules and get expert answers',
      category: 'learning',
      topicsCount: 892,
      postsCount: 5467,
      lastActivity: {
        user: 'RulesMaster',
        time: '15 minutes ago',
        topic: 'Understanding pass interference calls'
      },
      isSticky: false
    },
    {
      id: 'strategy-discussion',
      title: '🧠 Strategy & Tactics',
      description: 'Deep dives into game strategy, play calling, and tactics',
      category: 'advanced',
      topicsCount: 567,
      postsCount: 3421,
      lastActivity: {
        user: 'CoachingCorner',
        time: '1 hour ago',
        topic: 'Red zone efficiency: Short passes vs running game'
      },
      isSticky: false
    },
    {
      id: 'team-discussions',
      title: '🏈 Team Talk',
      description: 'Discuss your favorite teams, players, and matchups',
      category: 'teams',
      topicsCount: 2134,
      postsCount: 15678,
      lastActivity: {
        user: 'ChiefsFan4Life',
        time: '3 hours ago',
        topic: 'Chiefs offensive line analysis'
      },
      isSticky: false
    },
    {
      id: 'beginner-friendly',
      title: '🌱 Beginner Corner',
      description: 'Safe space for new fans to ask questions without judgment',
      category: 'learning',
      topicsCount: 643,
      postsCount: 2981,
      lastActivity: {
        user: 'HelpfulVeteran',
        time: '4 hours ago',
        topic: 'What does "down and distance" mean?'
      },
      isSticky: false
    },
    {
      id: 'game-predictions',
      title: '🔮 Predictions & Analysis',
      description: 'Share your game predictions and post-game analysis',
      category: 'analysis',
      topicsCount: 1876,
      postsCount: 9432,
      lastActivity: {
        user: 'StatGuru',
        time: '6 hours ago',
        topic: 'Week 15 predictions thread'
      },
      isSticky: false
    },
    {
      id: 'learning-progress',
      title: '📚 Learning Journey',
      description: 'Share your progress, celebrate achievements, find study buddies',
      category: 'community',
      topicsCount: 234,
      postsCount: 1567,
      lastActivity: {
        user: 'StudyBuddy2024',
        time: '8 hours ago',
        topic: 'Just completed my first learning track!'
      },
      isSticky: false
    },
    {
      id: 'feedback-suggestions',
      title: '💡 Feedback & Suggestions',
      description: 'Share ideas for improving the learning experience',
      category: 'meta',
      topicsCount: 156,
      postsCount: 892,
      lastActivity: {
        user: 'IdeaMachine',
        time: '12 hours ago',
        topic: 'Suggestion: Interactive field diagrams'
      },
      isSticky: false
    }
  ]

  const generatePostsData = (forumId) => {
    const basePosts = [
      {
        id: 1,
        title: 'Welcome to the football Learning Community! 📋',
        author: {
          username: 'KickoffClubModerator',
          displayName: 'Moderator Team',
          avatar: '👨‍💼',
          level: 'moderator',
          joinDate: '2024-01-01'
        },
        content: `Welcome to our discussion forums! Here are some guidelines to help everyone have a great experience:

**Forum Rules:**
• Be respectful and constructive
• Stay on topic
• No spam or self-promotion
• Help newcomers feel welcome
• Back up claims with evidence when possible

**Getting Started:**
• Introduce yourself in the General Discussion
• Check out the Beginner Corner if you're new to football
• Use the search function before posting questions

Happy learning! 🏈`,
        createdAt: '2024-01-15T10:00:00Z',
        replies: 47,
        likes: 156,
        isSticky: true,
        isLocked: false,
        lastReply: {
          author: 'NewFan2024',
          time: '1 day ago'
        },
        tags: ['welcome', 'rules', 'community']
      }
    ]

    // Generate forum-specific posts
    const forumSpecificPosts = {
      'general': [
        {
          id: 2,
          title: 'Best rookie performances this season? 🌟',
          author: {
            username: 'footballFanatic2024',
            displayName: 'Mike Johnson',
            avatar: '🏈',
            level: 'expert-level',
            joinDate: '2024-03-15'
          },
          content: 'Who do you think has been the standout rookie this season? I\'ve been really impressed with [Player Name]\'s development...',
          createdAt: '2024-12-02T14:30:00Z',
          replies: 23,
          likes: 45,
          isSticky: false,
          isLocked: false,
          lastReply: {
            author: 'RookieWatcher',
            time: '2 minutes ago'
          },
          tags: ['rookies', 'analysis', 'season-2024']
        }
      ],
      'rules-questions': [
        {
          id: 3,
          title: 'Understanding pass interference calls 🤔',
          author: {
            username: 'ConfusedFan88',
            displayName: 'Jennifer Smith',
            avatar: '❓',
            level: 'fan-level',
            joinDate: '2024-08-20'
          },
          content: 'I\'m still confused about when pass interference is called vs when it isn\'t. Can someone explain the key factors refs look for?',
          createdAt: '2024-12-02T09:15:00Z',
          replies: 18,
          likes: 34,
          isSticky: false,
          isLocked: false,
          lastReply: {
            author: 'RulesMaster',
            time: '15 minutes ago'
          },
          tags: ['rules', 'penalties', 'pass-interference']
        }
      ]
    }

    return [
      ...basePosts,
      ...(forumSpecificPosts[forumId] || [])
    ]
  }

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📋' },
    { id: 'general', name: 'General', icon: '💬' },
    { id: 'learning', name: 'Learning', icon: '📚' },
    { id: 'advanced', name: 'Advanced', icon: '🧠' },
    { id: 'teams', name: 'Teams', icon: '🏈' },
    { id: 'analysis', name: 'Analysis', icon: '📊' },
    { id: 'community', name: 'Community', icon: '👥' },
    { id: 'meta', name: 'Meta', icon: '💡' }
  ]

  const filteredForums = activeCategory === 'all' 
    ? forums 
    : forums.filter(forum => forum.category === activeCategory)

  const handleCreateTopic = async () => {
    if (!user || !newTopic.title.trim() || !newTopic.content.trim()) return

    const topic = {
      id: Date.now(),
      title: newTopic.title,
      author: {
        username: user.username,
        displayName: user.profile.displayName,
        avatar: '👤',
        level: user.progress.stats.currentLevel,
        joinDate: user.createdAt
      },
      content: newTopic.content,
      createdAt: new Date().toISOString(),
      replies: 0,
      likes: 0,
      isSticky: false,
      isLocked: false,
      lastReply: null,
      tags: [newTopic.category]
    }

    // Add topic to current forum if one is selected
    if (selectedForum) {
      setPosts([topic, ...posts])
    }

    // Update user progress
    await updateUserProgress({
      achievements: {
        ...user.progress.achievements,
        socialInteractions: [
          ...user.progress.achievements.socialInteractions,
          {
            type: 'forum-post',
            timestamp: new Date().toISOString(),
            topicTitle: newTopic.title
          }
        ]
      },
      stats: {
        ...user.progress.stats,
        totalPoints: user.progress.stats.totalPoints + 10
      }
    })

    setNewTopic({ title: '', content: '', category: 'general' })
    setShowNewTopicModal(false)
  }

  const handleReply = async (postId) => {
    if (!user || !replyContent.trim()) return

    // Simulate adding reply (in real app, would update database)
    const post = posts.find(p => p.id === postId)
    if (post) {
      const updatedPosts = posts.map(p =>
        p.id === postId
          ? { ...p, replies: p.replies + 1, lastReply: { author: user.username, time: 'just now' } }
          : p
      )
      setPosts(updatedPosts)
    }

    // Award points for participation
    await updateUserProgress({
      stats: {
        ...user.progress.stats,
        totalPoints: user.progress.stats.totalPoints + 5
      }
    })

    setReplyContent('')
    setShowReplyForm({ ...showReplyForm, [postId]: false })
  }

  const formatTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const getLevelColor = (level) => {
    if (level === 'moderator') return 'bg-red-100 text-red-800'
    
    const colors = {
      'rookie-level': 'bg-green-100 text-green-800',
      'fan-level': 'bg-blue-100 text-blue-800',
      'enthusiast-level': 'bg-orange-100 text-orange-800',
      'expert-level': 'bg-purple-100 text-purple-800',
      'pro-level': 'bg-yellow-100 text-yellow-800'
    }
    return colors[level] || 'bg-gray-100 text-gray-800'
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gradient-to-r from-sage-50 to-blush-50 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">💬</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join the Discussion</h2>
          <p className="text-gray-600 mb-6">
            Create an account to participate in our community forums, ask questions, and share your football knowledge!
          </p>
          <button className="btn-primary">
            Create Account
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            💬 Discussion Forums
          </h1>
          <p className="text-xl text-gray-600">
            Connect with fellow learners and share your football knowledge
          </p>
        </div>
        
        {!selectedForum && (
          <button
            onClick={() => setShowNewTopicModal(true)}
            className="btn-primary"
          >
            + New Topic
          </button>
        )}
      </div>

      {selectedForum ? (
        /* Individual Forum View */
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setSelectedForum(null)
                  setPosts([])
                }}
                className="text-sage-600 hover:text-sage-700 font-medium"
              >
                ← Back to Forums
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedForum.title}</h2>
                <p className="text-gray-600">{selectedForum.description}</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowNewTopicModal(true)}
              className="btn-primary"
            >
              + New Topic
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin text-4xl mb-4">💭</div>
              <p className="text-gray-600">Loading posts...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                        {post.author.avatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{post.author.displayName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(post.author.level)}`}>
                            {post.author.level === 'moderator' ? 'Mod' : post.author.level.replace('-level', '')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">@{post.author.username}</p>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 text-right">
                      <div>{formatTimeAgo(post.createdAt)}</div>
                      {post.isSticky && <div className="text-orange-600 font-medium">📌 Pinned</div>}
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{post.title}</h4>
                  <div className="text-gray-700 mb-4 whitespace-pre-line">{post.content}</div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span>👍 {post.likes}</span>
                      <span>💬 {post.replies} replies</span>
                      {post.lastReply && (
                        <span>Last reply by {post.lastReply.author} {post.lastReply.time}</span>
                      )}
                    </div>

                    <button
                      onClick={() => setShowReplyForm({ ...showReplyForm, [post.id]: !showReplyForm[post.id] })}
                      className="text-sage-600 hover:text-sage-700 font-medium"
                    >
                      💬 Reply
                    </button>
                  </div>

                  {showReplyForm[post.id] && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write your reply..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                        rows={3}
                      />
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          onClick={() => setShowReplyForm({ ...showReplyForm, [post.id]: false })}
                          className="px-4 py-2 text-gray-600 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleReply(post.id)}
                          className="px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600"
                        >
                          Post Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Forum List View */
        <div>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-sage-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-sage-100'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin text-4xl mb-4">💭</div>
              <p className="text-gray-600">Loading forums...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredForums.map(forum => (
                <div
                  key={forum.id}
                  className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer ${
                    forum.isSticky ? 'ring-2 ring-yellow-200' : ''
                  }`}
                  onClick={() => loadForumPosts(forum.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{forum.title}</h3>
                        {forum.isSticky && <span className="text-yellow-600">📌</span>}
                      </div>
                      <p className="text-gray-600 mb-4">{forum.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span>📝 {forum.topicsCount.toLocaleString()} topics</span>
                        <span>💬 {forum.postsCount.toLocaleString()} posts</span>
                      </div>
                    </div>

                    <div className="text-right ml-4">
                      <div className="text-sm text-gray-600">
                        <div className="font-medium">{forum.lastActivity.user}</div>
                        <div className="text-gray-500">{forum.lastActivity.time}</div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 max-w-48 truncate">
                        "{forum.lastActivity.topic}"
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* New Topic Modal */}
      {showNewTopicModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Create New Topic</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newTopic.category}
                  onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                >
                  {categories.slice(1).map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic Title</label>
                <input
                  type="text"
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                  placeholder="Enter a descriptive title..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={newTopic.content}
                  onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                  placeholder="Share your thoughts, ask questions, or start a discussion..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                  rows={6}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowNewTopicModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTopic}
                disabled={!newTopic.title.trim() || !newTopic.content.trim()}
                className="px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Topic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}