import { useState, useEffect, useCallback } from 'react'
import { checkMockLocationStatusSafe } from '../services/mockLocationDetectService'
import { MockLocationDetectResult, DetectionStatus } from '../types'
import { logError } from '../../../utils/errors'

const FEATURE_ID = 'mock-location-detect'

interface UseMockLocationDetectReturn {
  result: MockLocationDetectResult | null
  status: DetectionStatus
  error: string | null
  refetch: () => Promise<void>
}

export function useMockLocationDetect(): UseMockLocationDetectReturn {
  const [result, setResult] = useState<MockLocationDetectResult | null>(null)
  const [status, setStatus] = useState<DetectionStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setStatus('scanning')
    setError(null)
    try {
      const data = await checkMockLocationStatusSafe()
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
