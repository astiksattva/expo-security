import { useState, useCallback } from 'react'
import { BiometricAuthResult, BiometricStatus } from '../types'
import {
  getFingerprintStatus,
  authenticateFingerprint,
} from '../services/fingerprintService'

interface UseFingerprintReturn {
  status: BiometricStatus | null
  isLoading: boolean
  error: string | null
  result: BiometricAuthResult | null
  checkStatus: () => Promise<void>
  authenticate: () => Promise<void>
  reset: () => void
}

export function useFingerprint(): UseFingerprintReturn {
  const [status, setStatus] = useState<BiometricStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<BiometricAuthResult | null>(null)

  const checkStatus = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const fingerprintStatus = await getFingerprintStatus()
      setStatus(fingerprintStatus)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check fingerprint status')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const authenticate = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    try {
      const authResult = await authenticateFingerprint()
      setResult(authResult)
      if (!authResult.success && authResult.error) {
        setError(authResult.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setStatus(null)
    setError(null)
    setResult(null)
  }, [])

  return {
    status,
    isLoading,
    error,
    result,
    checkStatus,
    authenticate,
    reset,
  }
}
