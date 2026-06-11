import { useState, useCallback, useEffect, useRef } from 'react'
import { AutoLogoutConfig, AutoLogoutStatus, InactivityWarning } from '../types'
import {
  configureAutoLogout,
  recordActivity,
  getAutoLogoutStatus,
  startAutoLogoutMonitor,
  stopAutoLogoutMonitor,
  resetAutoLogout,
  getAutoLogoutConfig,
} from '../services/autoLogoutService'

interface UseAutoLogoutReturn {
  status: AutoLogoutStatus | null
  warning: InactivityWarning | null
  isLoading: boolean
  isMonitoring: boolean
  error: string | null
  recordActivity: () => Promise<void>
  reset: () => void
  start: (onTimeout?: () => void) => void
  stop: () => void
  configure: (config: Partial<AutoLogoutConfig>) => void
  checkStatus: () => Promise<void>
}

export function useAutoLogout(): UseAutoLogoutReturn {
  const [status, setStatus] = useState<AutoLogoutStatus | null>(null)
  const [warning, setWarning] = useState<InactivityWarning | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const onTimeoutRef = useRef<(() => void) | undefined>(undefined)

  const handleCheckStatus = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const currentStatus = await getAutoLogoutStatus()
      setStatus(currentStatus)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to check auto logout status',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleRecordActivity = useCallback(async () => {
    try {
      await recordActivity()
      setWarning(null)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to record activity',
      )
    }
  }, [])

  const handleStart = useCallback(
    (onTimeout?: () => void) => {
      onTimeoutRef.current = onTimeout
      startAutoLogoutMonitor(
        () => {
          onTimeout?.()
          setIsMonitoring(false)
        },
        (warn) => {
          setWarning(warn)
        },
      )
      setIsMonitoring(true)
      handleCheckStatus()
    },
    [handleCheckStatus],
  )

  const handleStop = useCallback(() => {
    stopAutoLogoutMonitor()
    setIsMonitoring(false)
    setWarning(null)
  }, [])

  const handleReset = useCallback(() => {
    resetAutoLogout()
    setWarning(null)
    handleCheckStatus()
  }, [handleCheckStatus])

  const handleConfigure = useCallback((cfg: Partial<AutoLogoutConfig>) => {
    configureAutoLogout(cfg)
  }, [])

  useEffect(() => {
    return () => {
      stopAutoLogoutMonitor()
    }
  }, [])

  return {
    status,
    warning,
    isLoading,
    isMonitoring,
    error,
    recordActivity: handleRecordActivity,
    reset: handleReset,
    start: handleStart,
    stop: handleStop,
    configure: handleConfigure,
    checkStatus: handleCheckStatus,
  }
}
