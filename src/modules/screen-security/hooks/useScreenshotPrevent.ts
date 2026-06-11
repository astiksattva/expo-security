import { useState, useCallback, useEffect } from 'react'
import { ScreenshotPreventState } from '../types'
import {
  preventScreenshots,
  allowScreenshots,
  isScreenCaptureAvailable,
} from '../services/screenshotPreventService'
import { FeatureError, getErrorMessage } from '../../../utils/errors'

interface UseScreenshotPreventReturn {
  state: ScreenshotPreventState
  error: string | null
  loading: boolean
  enable: () => Promise<void>
  disable: () => Promise<void>
  toggle: () => Promise<void>
}

export function useScreenshotPrevent(): UseScreenshotPreventReturn {
  const [state, setState] = useState<ScreenshotPreventState>({
    isPrevented: false,
    available: true,
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkAvailability()
  }, [])

  const checkAvailability = useCallback(async () => {
    try {
      const available = await isScreenCaptureAvailable()
      setState((prev) => ({ ...prev, available }))
    } catch {
      setState((prev) => ({ ...prev, available: false }))
    }
  }, [])

  const enable = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      await preventScreenshots()
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
      await allowScreenshots()
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
