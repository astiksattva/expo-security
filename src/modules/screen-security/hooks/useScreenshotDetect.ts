import { useState, useEffect, useCallback, useRef } from 'react'
import { Subscription } from 'expo-screen-capture'
import { ScreenshotDetectState } from '../types'
import { subscribeToScreenshots, unsubscribeFromScreenshots } from '../services/screenshotDetectService'
import { FeatureError } from '../../../utils/errors'

interface UseScreenshotDetectReturn {
  state: ScreenshotDetectState
  error: string | null
  loading: boolean
  reset: () => void
  startListening: () => void
  stopListening: () => void
}

export function useScreenshotDetect(): UseScreenshotDetectReturn {
  const [state, setState] = useState<ScreenshotDetectState>({
    detected: false,
    timestamp: null,
    listenerActive: false,
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const subscriptionRef = useRef<Subscription | null>(null)

  const handleScreenshot = useCallback(() => {
    setState({
      detected: true,
      timestamp: Date.now(),
      listenerActive: true,
    })
  }, [])

  const startListening = useCallback(() => {
    setLoading(true)
    setError(null)
    try {
      unsubscribeFromScreenshots(subscriptionRef.current)
      const sub = subscribeToScreenshots(handleScreenshot)
      subscriptionRef.current = sub
      setState((prev) => ({ ...prev, listenerActive: true }))
    } catch (err) {
      const message =
        err instanceof FeatureError
          ? err.message
          : 'Failed to start screenshot listener'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [handleScreenshot])

  const stopListening = useCallback(() => {
    unsubscribeFromScreenshots(subscriptionRef.current)
    subscriptionRef.current = null
    setState((prev) => ({ ...prev, listenerActive: false }))
  }, [])

  const reset = useCallback(() => {
    setState({
      detected: false,
      timestamp: null,
      listenerActive: state.listenerActive,
    })
    setError(null)
  }, [state.listenerActive])

  useEffect(() => {
    return () => {
      unsubscribeFromScreenshots(subscriptionRef.current)
    }
  }, [])

  return {
    state,
    error,
    loading,
    reset,
    startListening,
    stopListening,
  }
}
