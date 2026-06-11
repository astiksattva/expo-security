import { useState, useEffect, useCallback, useRef } from 'react'
import {
  parseDeepLink,
  getInitialURL,
  addURLListener,
  removeURLListener,
} from '../services/deepLinkingService'
import { DeepLink } from '../types'

interface UseDeepLinkingReturn {
  deepLink: DeepLink | null
  initialDeepLink: DeepLink | null
  isLoading: boolean
  error: string | null
}

export function useDeepLinking(): UseDeepLinkingReturn {
  const [deepLink, setDeepLink] = useState<DeepLink | null>(null)
  const [initialDeepLink, setInitialDeepLink] = useState<DeepLink | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const subscriptionRef = useRef<ReturnType<typeof addURLListener> | null>(null)

  useEffect(() => {
    loadInitialURL()

    subscriptionRef.current = addURLListener((event) => {
      try {
        const parsed = parseDeepLink(event.url)
        setDeepLink(parsed)
        setError(null)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to process deep link'
        setError(message)
      }
    })

    return () => {
      if (subscriptionRef.current) {
        removeURLListener(subscriptionRef.current)
      }
    }
  }, [])

  const loadInitialURL = useCallback(async () => {
    try {
      const url = await getInitialURL()
      if (url) {
        const parsed = parseDeepLink(url)
        setInitialDeepLink(parsed)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get initial URL'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    deepLink,
    initialDeepLink,
    isLoading,
    error,
  }
}
