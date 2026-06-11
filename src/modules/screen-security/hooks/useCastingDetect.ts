import { useState, useCallback, useEffect, useRef } from 'react'
import { CastingDetectState } from '../types'
import {
  checkCastingStatus,
  isCastingDetectionAvailable,
} from '../services/castingDetectService'
import { getErrorMessage } from '../../../utils/errors'

interface UseCastingDetectReturn {
  state: CastingDetectState
  error: string | null
  loading: boolean
  refresh: () => Promise<void>
  pollingActive: boolean
  startPolling: () => void
  stopPolling: () => void
  details: string | null
}

const POLL_INTERVAL = 3000

export function useCastingDetect(): UseCastingDetectReturn {
  const [state, setState] = useState<CastingDetectState>({
    isCasting: false,
    available: isCastingDetectionAvailable(),
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [pollingActive, setPollingActive] = useState(false)
  const [details, setDetails] = useState<string | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await checkCastingStatus()
      setState({
        isCasting: result.isCasting,
        available: result.method === 'native',
      })
      setDetails(result.details)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  const startPolling = useCallback(() => {
    if (intervalRef.current) return
    setPollingActive(true)
    refresh()
    intervalRef.current = setInterval(refresh, POLL_INTERVAL)
  }, [refresh])

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setPollingActive(false)
  }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    state,
    error,
    loading,
    refresh,
    pollingActive,
    startPolling,
    stopPolling,
    details,
  }
}
