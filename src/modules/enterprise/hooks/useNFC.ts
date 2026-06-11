import { useState, useEffect, useCallback, useRef } from 'react'
import {
  isNFCAvailable,
  startNFCPolling,
  stopNFCPolling,
  parseNfcTag,
  addNfcTagListener,
  removeNfcListener,
} from '../services/nfcService'
import { NFCTag } from '../types'

interface UseNFCReturn {
  isAvailable: boolean | null
  isPolling: boolean
  lastTag: NFCTag | null
  isLoading: boolean
  error: string | null
  startPolling: () => Promise<void>
  stopPolling: () => Promise<void>
  clearTag: () => void
}

export function useNFC(): UseNFCReturn {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [isPolling, setIsPolling] = useState(false)
  const [lastTag, setLastTag] = useState<NFCTag | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const subscriptionRef = useRef<ReturnType<typeof addNfcTagListener> | null>(null)

  useEffect(() => {
    checkAvailability()

    return () => {
      stopPollingCleanup()
    }
  }, [])

  const checkAvailability = useCallback(async () => {
    try {
      const available = await isNFCAvailable()
      setIsAvailable(available)
    } catch {
      setIsAvailable(false)
    }
  }, [])

  const stopPollingCleanup = useCallback(async () => {
    if (subscriptionRef.current) {
      removeNfcListener(subscriptionRef.current)
      subscriptionRef.current = null
    }
    setIsPolling(false)
  }, [])

  const startPolling = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      await startNFCPolling()

      subscriptionRef.current = addNfcTagListener((tag: unknown) => {
        const parsed = parseNfcTag(tag as Parameters<typeof parseNfcTag>[0])
        setLastTag(parsed)
      })

      setIsPolling(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start NFC polling'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const stopPolling = useCallback(async () => {
    try {
      await stopNFCPolling()
      await stopPollingCleanup()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to stop NFC polling'
      setError(message)
    }
  }, [stopPollingCleanup])

  const clearTag = useCallback(() => {
    setLastTag(null)
  }, [])

  return {
    isAvailable,
    isPolling,
    lastTag,
    isLoading,
    error,
    startPolling,
    stopPolling,
    clearTag,
  }
}
