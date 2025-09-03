// Real-time performance monitoring dashboard for genius-level optimization
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { usePerformanceMonitor, useAdaptiveQuality } from '../hooks/usePerformance'
import { analyticsEngine } from '../utils/advancedAnalytics'

const PerformanceMonitoringDashboard = ({ isVisible, onClose }) => {
  const { getMetrics } = usePerformanceMonitor()
  const { deviceCapabilities } = useAdaptiveQuality()
  const [realTimeMetrics, setRealTimeMetrics] = useState({})
  const [historicalData, setHistoricalData] = useState([])
  const [currentTab, setCurrentTab] = useState('overview')

  // Update metrics every second
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      const metrics = getMetrics()
      const analyticsData = analyticsEngine.exportAnalyticsData()
      const insights = analyticsEngine.generateInsights()
      
      setRealTimeMetrics({
        ...metrics,
        timestamp: Date.now(),
        memoryUsage: performance.memory ? {
          used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
        } : null,
        connectionInfo: navigator.connection ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt,
          saveData: navigator.connection.saveData
        } : null,
        analyticsData,
        insights
      })
      
      setHistoricalData(prev => [
        ...prev.slice(-50), // Keep last 50 data points
        {
          timestamp: Date.now(),
          fps: metrics.fps || 60,
          renderTime: metrics.averageRenderTime || 0,
          memoryUsed: performance.memory ? performance.memory.usedJSHeapSize / 1024 / 1024 : 0
        }
      ])
    }, 1000)

    return () => clearInterval(interval)
  }, [isVisible, getMetrics])

  const memoryUsagePercentage = useMemo(() => {
    if (!realTimeMetrics.memoryUsage) return 0
    return (realTimeMetrics.memoryUsage.used / realTimeMetrics.memoryUsage.limit) * 100
  }, [realTimeMetrics.memoryUsage])

  const performanceScore = useMemo(() => {
    const fpsScore = Math.min(100, (realTimeMetrics.fps || 60) / 60 * 100)
    const renderScore = Math.max(0, 100 - (realTimeMetrics.averageRenderTime || 0) * 2)
    const memoryScore = Math.max(0, 100 - memoryUsagePercentage)
    
    return Math.round((fpsScore + renderScore + memoryScore) / 3)
  }, [realTimeMetrics, memoryUsagePercentage])

  const getPerformanceColor = useCallback((score) => {
    if (score >= 80) return 'text-success-600'
    if (score >= 60) return 'text-warning-600'
    return 'text-error-600'
  }, [])

  const getPerformanceGradient = useCallback((score) => {
    if (score >= 80) return 'from-success-500 to-success-600'
    if (score >= 60) return 'from-warning-500 to-warning-600'
    return 'from-error-500 to-error-600'
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-5/6 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary-100 to-secondary-200 text-white p-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Performance Monitor</h2>
              <p className="text-white text-opacity-80">Real-time system diagnostics & optimization</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-full bg-white bg-opacity-20 ${getPerformanceColor(performanceScore)} font-bold`}>
              Performance Score: {performanceScore}/100
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            {[
              { id: 'overview', name: 'Overview', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { id: 'analytics', name: 'User Analytics', icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { id: 'network', name: 'Network & Memory', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0' },
              { id: 'insights', name: 'AI Insights', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium flex items-center space-x-2 border-b-2 transition-colors ${
                  currentTab === tab.id
                    ? 'border-accent-500 text-accent-600 bg-accent-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Performance Score */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
                  <div className={`w-4 h-4 rounded-full ${performanceScore >= 80 ? 'bg-success-500' : performanceScore >= 60 ? 'bg-warning-500' : 'bg-error-500'}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{performanceScore}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${getPerformanceGradient(performanceScore)} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${performanceScore}%` }}
                  />
                </div>
              </div>

              {/* FPS */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Frame Rate</h3>
                  <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{Math.round(realTimeMetrics.fps || 60)}</div>
                <div className="text-sm text-gray-500">FPS</div>
              </div>

              {/* Memory Usage */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Memory</h3>
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {realTimeMetrics.memoryUsage ? `${realTimeMetrics.memoryUsage.used}` : '—'}
                </div>
                <div className="text-sm text-gray-500">
                  MB / {realTimeMetrics.memoryUsage ? `${realTimeMetrics.memoryUsage.limit}MB` : 'Unknown'}
                </div>
              </div>

              {/* Render Time */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Render Time</h3>
                  <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {(realTimeMetrics.averageRenderTime || 0).toFixed(1)}
                </div>
                <div className="text-sm text-gray-500">ms avg</div>
              </div>
            </div>
          )}

          {currentTab === 'analytics' && realTimeMetrics.analyticsData && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Analytics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Session Duration</span>
                      <span className="font-medium">{Math.round(realTimeMetrics.analyticsData.sessionDuration / 60000)}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Events</span>
                      <span className="font-medium">{realTimeMetrics.analyticsData.events.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Learning Events</span>
                      <span className="font-medium">
                        {realTimeMetrics.analyticsData.events.filter(e => e.type.startsWith('learning_')).length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Interaction Patterns</h3>
                  <div className="space-y-3">
                    {Object.entries(realTimeMetrics.analyticsData.behaviorPatterns).slice(0, 3).map(([pattern, data]) => (
                      <div key={pattern} className="flex justify-between">
                        <span className="text-gray-600 text-sm">{pattern.replace('_pattern', '').replace(/_/g, ' ')}</span>
                        <span className="font-medium">{data.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h3>
                  <div className="space-y-3">
                    {Object.entries(realTimeMetrics.analyticsData.learningAnalytics).map(([lessonId, analytics]) => (
                      <div key={lessonId} className="flex justify-between">
                        <span className="text-gray-600 text-sm">{lessonId}</span>
                        <span className="font-medium">
                          {Math.round((analytics.completionPrediction || 0) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'network' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Information</h3>
                {realTimeMetrics.connectionInfo ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Connection Type</span>
                      <span className="font-medium">{realTimeMetrics.connectionInfo.effectiveType.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Downlink Speed</span>
                      <span className="font-medium">{realTimeMetrics.connectionInfo.downlink} Mbps</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RTT</span>
                      <span className="font-medium">{realTimeMetrics.connectionInfo.rtt}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Save Data</span>
                      <span className={`font-medium ${realTimeMetrics.connectionInfo.saveData ? 'text-warning-600' : 'text-success-600'}`}>
                        {realTimeMetrics.connectionInfo.saveData ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Network information not available</p>
                )}
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Capabilities</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">CPU Cores</span>
                    <span className="font-medium">{deviceCapabilities.cores || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">RAM</span>
                    <span className="font-medium">{deviceCapabilities.ram ? `${deviceCapabilities.ram}GB` : 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quality Level</span>
                    <span className="font-medium capitalize">{deviceCapabilities.quality}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'insights' && realTimeMetrics.insights && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl p-6 border border-accent-200">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 text-accent-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900">AI-Powered Insights</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Learning Optimization</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Most Engaged Time</span>
                        <span className="font-medium">{realTimeMetrics.insights.mostEngagedTimeOfDay || 'Morning'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Learning Efficiency</span>
                        <span className="font-medium">{Math.round((realTimeMetrics.insights.learningEfficiencyScore || 0) * 100)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recommended Break</span>
                        <span className="font-medium">{Math.round((realTimeMetrics.insights.recommendedBreakTime || 300000) / 60000)}min</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Improvement Areas</h4>
                    {realTimeMetrics.insights.areasForImprovement?.length > 0 ? (
                      <div className="space-y-2">
                        {realTimeMetrics.insights.areasForImprovement.map((area, index) => (
                          <div key={index} className="p-3 bg-white rounded-lg border border-warning-200">
                            <div className="font-medium text-warning-700 capitalize">{area.area.replace('_', ' ')}</div>
                            <div className="text-sm text-warning-600 mt-1">{area.recommendation}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-success-600">No improvement areas identified - great performance!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PerformanceMonitoringDashboard