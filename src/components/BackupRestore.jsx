import React, { useState, useEffect } from 'react'
import { BackupManager } from '../utils/storageProtection'

export default function BackupRestore({ onClose }) {
  const [backupInfo, setBackupInfo] = useState(null)
  const [status, setStatus] = useState(null)
  const [importing, setImporting] = useState(false)

  useEffect(() => {
    loadBackupInfo()
  }, [])

  const loadBackupInfo = () => {
    const info = BackupManager.getBackupInfo()
    setBackupInfo(info)
  }

  const handleBackup = () => {
    const backup = BackupManager.createBackup()
    if (backup) {
      setStatus({ type: 'success', message: 'Backup created successfully!' })
      loadBackupInfo()
      setTimeout(() => setStatus(null), 3000)
    } else {
      setStatus({ type: 'error', message: 'Failed to create backup' })
    }
  }

  const handleDownload = () => {
    const result = BackupManager.exportToFile()
    if (result) {
      const { url, filename } = result

      // Create download link
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setStatus({ type: 'success', message: `Downloaded ${filename}` })
      setTimeout(() => setStatus(null), 3000)
    } else {
      setStatus({ type: 'error', message: 'Failed to export backup' })
    }
  }

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setImporting(true)
    setStatus({ type: 'info', message: 'Importing backup...' })

    const success = await BackupManager.importFromFile(file)

    if (success) {
      setStatus({ type: 'success', message: 'Backup restored successfully! Refreshing...' })
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } else {
      setStatus({ type: 'error', message: 'Failed to import backup. Please check the file.' })
      setImporting(false)
    }
  }

  const handleRestore = () => {
    if (!backupInfo?.exists) {
      setStatus({ type: 'error', message: 'No backup available to restore' })
      return
    }

    const confirmed = window.confirm(
      'This will restore your data from the most recent backup. Current changes may be lost. Continue?'
    )

    if (confirmed) {
      const success = BackupManager.restoreFromBackup()
      if (success) {
        setStatus({ type: 'success', message: 'Backup restored! Refreshing...' })
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        setStatus({ type: 'error', message: 'Failed to restore backup' })
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-100 to-accent-100 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-secondary-100">Backup & Restore</h2>
            <button
              onClick={onClose}
              className="text-secondary-300 hover:text-secondary-100 text-2xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="text-secondary-200 mt-2">
            Protect your progress from being lost
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Status message */}
          {status && (
            <div className={`p-4 rounded-lg ${
              status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
              status.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
              'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              {status.message}
            </div>
          )}

          {/* Backup Info */}
          <div className="bg-sage-50 rounded-lg p-6 border border-sage-200">
            <h3 className="text-lg font-semibold text-secondary-100 mb-4 flex items-center">
              <span className="text-2xl mr-2">📦</span>
              Automatic Backup Status
            </h3>
            {backupInfo?.exists ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-300">Last backup:</span>
                  <span className="font-medium text-secondary-100">
                    {backupInfo.timestamp?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-300">Backup age:</span>
                  <span className="font-medium text-secondary-100">
                    {backupInfo.age} hour{backupInfo.age !== 1 ? 's' : ''} ago
                  </span>
                </div>
                <div className="mt-4 p-3 bg-white rounded border border-sage-200">
                  <p className="text-xs text-secondary-300">
                    ℹ️ Automatic backups are created every 24 hours and before you close the browser
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-secondary-300">No automatic backup found yet. Create one below!</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-secondary-100 mb-4">Actions</h3>

              {/* Create Backup */}
              <div className="space-y-4">
                <button
                  onClick={handleBackup}
                  className="w-full btn-primary text-lg py-4 flex items-center justify-center"
                >
                  <span className="text-xl mr-2">💾</span>
                  Create Backup Now
                </button>

                {/* Download Backup */}
                <button
                  onClick={handleDownload}
                  className="w-full btn-secondary text-lg py-4 flex items-center justify-center"
                >
                  <span className="text-xl mr-2">⬇️</span>
                  Download Backup File
                </button>

                {/* Restore from Automatic Backup */}
                <button
                  onClick={handleRestore}
                  disabled={!backupInfo?.exists}
                  className="w-full border-2 border-accent-300 text-accent-700 hover:bg-accent-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold rounded-lg px-6 py-4 transition-all flex items-center justify-center"
                >
                  <span className="text-xl mr-2">♻️</span>
                  Restore from Last Backup
                </button>

                {/* Import Backup File */}
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileSelect}
                    disabled={importing}
                    id="backup-file-input"
                    className="hidden"
                  />
                  <label
                    htmlFor="backup-file-input"
                    className={`w-full border-2 border-primary-300 text-primary-700 hover:bg-primary-50 font-semibold rounded-lg px-6 py-4 transition-all flex items-center justify-center cursor-pointer ${
                      importing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="text-xl mr-2">⬆️</span>
                    {importing ? 'Importing...' : 'Import Backup File'}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blush-50 rounded-lg p-6 border border-blush-200">
            <h3 className="font-semibold text-secondary-100 mb-3 flex items-center">
              <span className="text-xl mr-2">💡</span>
              How Backups Work
            </h3>
            <ul className="space-y-2 text-sm text-secondary-300">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Backups are automatically created every 24 hours</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>A backup is also created when you close your browser</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Download a backup file to save it permanently outside your browser</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You can restore progress from a backup file on any device</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span className="font-medium text-accent-700">Tip: Download a backup file before clearing your browser data!</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="btn-secondary px-6 py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
