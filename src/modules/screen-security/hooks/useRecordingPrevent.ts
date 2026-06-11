import { useState, useCallback, useEffect } from 'react'
import { RecordingPreventState } from '../types'
import {
  preventRecording,
  allowRecording,
  isRecordingPreventionAvailable,
} from '../services/recordingPreventService'
import { FeatureError, getErrorMessage } from '../../../utils/errors'

interface UseRecordingPreventReturn {
  state: RecordingPreventState
  error: string | null
  loading: boolean
  enable: () => Promise<void>
  disable: () => Promise<void>
  toggle: () => Promise<void>
}

export function useRecordingPrevent(): UseRecordingPreventReturn {
  const [state, setState] = useState<RecordingPreventState>({
    isPrevented: false,
    available: isRecordingPreventionAvailable(),
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const enable = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      await preventRecording()
      setState((prev) => ({ ...prev, isPrevented: true }))
    } catch (err) {
      const message =
        err instanceof FeatureError
          ? err.message
          : getErrorMessage(err)
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const disable = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      await allowRecording()
      setState((prev) => ({ ...prev, isPrevented: false }))
    } catch (err) {
      const message =
        err instanceof FeatureError
          ? err.message
          : getErrorMessage(err)
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const toggle = useCallback(async () => {
    if (state.isPrevented) {
      await disable()
    } else {
      await enable()
    }
  }, [state.isPrevented, enable, disable])

  return { state, error, loading, enable, disable, toggle }
}
