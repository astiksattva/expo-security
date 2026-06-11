import { useState, useCallback, useEffect, useRef } from 'react'
import { RecordingDetectState } from '../types'
import {
  checkRecordingStatus,
  isRecordingDetectionAvailable,
} from '../services/recordingDetectService'
import { getErrorMessage } from '../../../utils/errors'

interface UseRecordingDetectReturn {
  state: RecordingDetectState
  error: string | null
  loading: boolean
  refresh: () => Promise<void>
  pollingActive: boolean
  startPolling: () => void
  stopPolling: () => void
}

const POLL_INTERVAL = 2000

export function useRecordingDetect(): UseRecordingDetectReturn {
  const [state, setState] = useState<RecordingDetectState>({
    isRecording: false,
    available: isRecordingDetectionAvailable(),
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [pollingActive, setPollingActive] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await checkRecordingStatus()
      setState({ isRecording: result.isRecording, available: true })
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
  }
}
