// Enhanced localStorage protection with automatic backups
// Prevents data loss from browser clearing, quota exceeded, or corruption

const STORAGE_VERSION = '1.0'
const BACKUP_KEY = 'kickoff_club_backup'
const LAST_BACKUP_KEY = 'kickoff_club_last_backup'
const BACKUP_INTERVAL = 24 * 60 * 60 * 1000 // 24 hours

/**
 * Safe localStorage wrapper with error handling
 */
export class SafeStorage {
  static setItem(key, value) {
    try {
      const data = {
        version: STORAGE_VERSION,
        timestamp: Date.now(),
        value: value
      }
      localStorage.setItem(key, JSON.stringify(data))
      return true
    } catch (error) {
      console.error('localStorage setItem failed:', error)

      if (error.name === 'QuotaExceededError') {
        // Try to free up space
        this.cleanupOldData()
        // Try again
        try {
          localStorage.setItem(key, JSON.stringify({
            version: STORAGE_VERSION,
            timestamp: Date.now(),
            value: value
          }))
          return true
        } catch (retryError) {
          console.error('localStorage retry failed:', retryError)
          return false
        }
      }
      return false
    }
  }

  static getItem(key) {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return null

      // Handle both old format (direct value) and new format (with metadata)
      try {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === 'object' && 'value' in parsed) {
          return parsed.value
        }
        // Old format or direct value
        return parsed
      } catch {
        // Not JSON, return as-is
        return raw
      }
    } catch (error) {
      console.error('localStorage getItem failed:', error)
      return null
    }
  }

  static removeItem(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('localStorage removeItem failed:', error)
      return false
    }
  }

  static cleanupOldData() {
    try {
      // Remove old analytics and temporary data
      const keysToCheck = []
      for (let i = 0; i < localStorage.length; i++) {
        keysToCheck.push(localStorage.key(i))
      }

      keysToCheck.forEach(key => {
        // Remove temporary or old analytics data
        if (key.includes('temp_') || key.includes('analytics_old_')) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Cleanup failed:', error)
    }
  }
}

/**
 * Automatic backup system
 */
export class BackupManager {
  /**
   * Create a backup of all user data
   */
  static createBackup() {
    try {
      const allData = {}
      const keysToBackup = ['kickoff_club_users', 'kickoff_club_progress']

      keysToBackup.forEach(key => {
        const data = SafeStorage.getItem(key)
        if (data) {
          allData[key] = data
        }
      })

      const backup = {
        version: STORAGE_VERSION,
        timestamp: Date.now(),
        data: allData
      }

      localStorage.setItem(BACKUP_KEY, JSON.stringify(backup))
      localStorage.setItem(LAST_BACKUP_KEY, Date.now().toString())

      return backup
    } catch (error) {
      console.error('Backup creation failed:', error)
      return null
    }
  }

  /**
   * Restore from backup
   */
  static restoreFromBackup() {
    try {
      const backupStr = localStorage.getItem(BACKUP_KEY)
      if (!backupStr) {
        console.warn('No backup found')
        return false
      }

      const backup = JSON.parse(backupStr)

      // Restore each piece of data
      Object.entries(backup.data).forEach(([key, value]) => {
        SafeStorage.setItem(key, value)
      })

      return true
    } catch (error) {
      console.error('Restore from backup failed:', error)
      return false
    }
  }

  /**
   * Check if backup is needed (older than 24 hours)
   */
  static needsBackup() {
    try {
      const lastBackup = localStorage.getItem(LAST_BACKUP_KEY)
      if (!lastBackup) return true

      const lastBackupTime = parseInt(lastBackup, 10)
      const timeSinceBackup = Date.now() - lastBackupTime

      return timeSinceBackup > BACKUP_INTERVAL
    } catch {
      return true
    }
  }

  /**
   * Auto-backup if needed
   */
  static autoBackup() {
    if (this.needsBackup()) {
      return this.createBackup()
    }
    return null
  }

  /**
   * Export data as downloadable file
   */
  static exportToFile() {
    try {
      const backup = this.createBackup()
      if (!backup) return null

      const dataStr = JSON.stringify(backup, null, 2)
      const blob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)

      const filename = `kickoff-club-backup-${new Date().toISOString().split('T')[0]}.json`

      return { url, filename, blob }
    } catch (error) {
      console.error('Export to file failed:', error)
      return null
    }
  }

  /**
   * Import data from file
   */
  static async importFromFile(file) {
    try {
      const text = await file.text()
      const backup = JSON.parse(text)

      if (backup.version !== STORAGE_VERSION) {
        console.warn('Backup version mismatch, attempting migration...')
      }

      // Restore data
      Object.entries(backup.data).forEach(([key, value]) => {
        SafeStorage.setItem(key, value)
      })

      // Create a new backup of the imported data
      this.createBackup()

      return true
    } catch (error) {
      console.error('Import from file failed:', error)
      return false
    }
  }

  /**
   * Get backup info
   */
  static getBackupInfo() {
    try {
      const backupStr = localStorage.getItem(BACKUP_KEY)
      const lastBackup = localStorage.getItem(LAST_BACKUP_KEY)

      if (!backupStr || !lastBackup) {
        return {
          exists: false,
          timestamp: null,
          age: null
        }
      }

      const backup = JSON.parse(backupStr)
      const timestamp = parseInt(lastBackup, 10)
      const age = Date.now() - timestamp

      return {
        exists: true,
        timestamp: new Date(timestamp),
        age: Math.floor(age / (1000 * 60 * 60)), // hours
        dataKeys: Object.keys(backup.data)
      }
    } catch (error) {
      console.error('Failed to get backup info:', error)
      return {
        exists: false,
        timestamp: null,
        age: null
      }
    }
  }
}

/**
 * Initialize storage protection
 * Call this on app startup
 */
export function initializeStorageProtection() {
  // Create initial backup if needed
  BackupManager.autoBackup()

  // Set up periodic auto-backup (every hour)
  setInterval(() => {
    BackupManager.autoBackup()
  }, 60 * 60 * 1000) // 1 hour

  // Backup before page unload
  window.addEventListener('beforeunload', () => {
    BackupManager.createBackup()
  })

  console.log('Storage protection initialized')
}

// Export safe storage as default for localStorage operations
export default SafeStorage
