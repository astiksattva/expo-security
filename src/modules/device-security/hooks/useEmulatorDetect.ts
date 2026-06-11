import { useState, useEffect, useCallback } from 'react'
import { checkEmulatorStatus } from '../services/emulatorDetectService'
import { EmulatorDetectResult, DetectionStatus } from '../types'
import { logError } from '../../../utils/errors'

const FEATURE_ID = 'emulator-detect'

interface UseEmulatorDetectReturn {
  result: EmulatorDetectResult | null
  status: DetectionStatus
  error: string | null
  refetch: () => Promise<void>
}

export function useEmulatorDetect(): UseEmulatorDetectReturn {
  const [result, setResult] = useState<EmulatorDetectResult | null>(null)
  const [status, setStatus] = useState<DetectionStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setStatus('scanning')
    setError(null)
    try {
      const data = await checkEmulatorStatus()
      setResult(data)
      setStatus('complete')
    } catch (err) {
      logError(FEATURE_ID, err)
      setError(err instanceof Error ? err.message : 'Detection failed')
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { result, status, error, refetch }
}
