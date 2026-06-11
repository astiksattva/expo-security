import { useState, useEffect, useCallback } from 'react'
import { AppStateInfo, MonitoringResult } from '../types'
import {
  getAppStateInfo,
  subscribeToAppStateChanges,
  resetAppStateTimers,
} from '../services/appStateService'

interface UseAppStateReturn extends MonitoringResult<AppStateInfo> {
  resetTimers: () => void
  isForeground: boolean
}

export function useAppState(): UseAppStateReturn {
  const [data, setData] = useState<AppStateInfo>(() => getAppStateInfo())
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeToAppStateChanges((info) => {
      setData(info)
      setError(null)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const resetTimers = useCallback(() => {
    resetAppStateTimers()
    setData(getAppStateInfo())
  }, [])

  return {
    data,
    error,
    isLoading,
    resetTimers,
    isForeground: data.state === 'active',
  }
}
