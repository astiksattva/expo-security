import { useState, useEffect, useCallback } from 'react'
import { checkRootStatusSafe } from '../services/rootDetectService'
import { RootDetectResult, DetectionStatus } from '../types'
import { logError } from '../../../utils/errors'

const FEATURE_ID = 'root-detect'

interface UseRootDetectReturn {
  result: RootDetectResult | null
  status: DetectionStatus
  error: string | null
  refetch: () => Promise<void>
}

export function useRootDetect(): UseRootDetectReturn {
  const [result, setResult] = useState<RootDetectResult | null>(null)
  const [status, setStatus] = useState<DetectionStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setStatus('scanning')
    setError(null)
    try {
      const data = await checkRootStatusSafe()
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
