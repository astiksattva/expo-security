import { useState, useEffect, useCallback } from 'react'
import { checkDevModeStatusSafe } from '../services/devModeDetectService'
import { DevModeDetectResult, DetectionStatus } from '../types'
import { logError } from '../../../utils/errors'

const FEATURE_ID = 'dev-mode-detect'

interface UseDevModeDetectReturn {
  result: DevModeDetectResult | null
  status: DetectionStatus
  error: string | null
  refetch: () => Promise<void>
}

export function useDevModeDetect(): UseDevModeDetectReturn {
  const [result, setResult] = useState<DevModeDetectResult | null>(null)
  const [status, setStatus] = useState<DetectionStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setStatus('scanning')
    setError(null)
    try {
      const data = await checkDevModeStatusSafe()
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
