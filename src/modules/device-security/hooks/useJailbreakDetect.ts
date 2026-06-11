import { useState, useEffect, useCallback } from 'react'
import { checkJailbreakStatusSafe } from '../services/jailbreakDetectService'
import { JailbreakDetectResult, DetectionStatus } from '../types'
import { logError } from '../../../utils/errors'

const FEATURE_ID = 'jailbreak-detect'

interface UseJailbreakDetectReturn {
  result: JailbreakDetectResult | null
  status: DetectionStatus
  error: string | null
  refetch: () => Promise<void>
}

export function useJailbreakDetect(): UseJailbreakDetectReturn {
  const [result, setResult] = useState<JailbreakDetectResult | null>(null)
  const [status, setStatus] = useState<DetectionStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    setStatus('scanning')
    setError(null)
    try {
      const data = await checkJailbreakStatusSafe()
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
