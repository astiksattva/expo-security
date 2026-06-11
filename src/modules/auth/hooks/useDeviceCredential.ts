import { useState, useCallback } from 'react'
import { BiometricAuthResult } from '../types'
import {
  isDeviceCredentialAvailable,
  authenticateWithDeviceCredential,
} from '../services/deviceCredentialService'

interface UseDeviceCredentialReturn {
  isAvailable: boolean
  isLoading: boolean
  error: string | null
  result: BiometricAuthResult | null
  checkAvailability: () => Promise<void>
  authenticate: () => Promise<void>
  reset: () => void
}

export function useDeviceCredential(): UseDeviceCredentialReturn {
  const [isAvailable, setIsAvailable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<BiometricAuthResult | null>(null)

  const checkAvailability = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const available = await isDeviceCredentialAvailable()
      setIsAvailable(available)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check device credential availability')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const authenticate = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    try {
      const authResult = await authenticateWithDeviceCredential()
      setResult(authResult)
      if (!authResult.success && authResult.error) {
        setError(authResult.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Device credential authentication failed')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setIsAvailable(false)
    setError(null)
    setResult(null)
  }, [])

  return {
    isAvailable,
    isLoading,
    error,
    result,
    checkAvailability,
    authenticate,
    reset,
  }
}
