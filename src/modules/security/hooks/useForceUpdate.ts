import { useState, useCallback } from 'react'
import { VersionInfo, UpdateStatus, ForceUpdateConfig } from '../types'
import {
  checkForUpdate,
  getVersionInfo,
  getCurrentAppVersion,
  configureForceUpdate,
  getForceUpdateConfig,
  isForceUpdateSupported,
} from '../services/forceUpdateService'

interface UseForceUpdateReturn {
  versionInfo: VersionInfo | null
  updateStatus: UpdateStatus | null
  currentVersion: string
  isSupported: boolean
  isLoading: boolean
  error: string | null
  checkUpdate: (
    fetchMinVersion: () => Promise<string>,
  ) => Promise<void>
  fetchVersionInfo: (
    fetchLatest: () => Promise<string>,
    fetchMin: () => Promise<string>,
  ) => Promise<void>
  configure: (config: Partial<ForceUpdateConfig>) => void
}

export function useForceUpdate(): UseForceUpdateReturn {
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null)
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supported = isForceUpdateSupported()

  const checkUpdate = useCallback(
    async (fetchMinVersion: () => Promise<string>) => {
      setIsLoading(true)
      setError(null)
      try {
        const status = await checkForUpdate(fetchMinVersion)
        setUpdateStatus(status)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to check for update',
        )
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const handleFetchVersionInfo = useCallback(
    async (
      fetchLatest: () => Promise<string>,
      fetchMin: () => Promise<string>,
    ) => {
      setIsLoading(true)
      setError(null)
      try {
        const info = await getVersionInfo(fetchLatest, fetchMin)
        setVersionInfo(info)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to fetch version info',
        )
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const handleConfigure = useCallback(
    (cfg: Partial<ForceUpdateConfig>) => {
      configureForceUpdate(cfg)
    },
    [],
  )

  return {
    versionInfo,
    updateStatus,
    currentVersion: getCurrentAppVersion(),
    isSupported: supported,
    isLoading,
    error,
    checkUpdate,
    fetchVersionInfo: handleFetchVersionInfo,
    configure: handleConfigure,
  }
}
