import { useState, useEffect, useCallback } from 'react'
import { NetworkState, MonitoringResult } from '../types'
import { getNetworkState, subscribeToNetworkChanges } from '../services/networkService'

interface UseNetworkReturn extends MonitoringResult<NetworkState> {
  refetch: () => Promise<void>
}

export function useNetwork(): UseNetworkReturn {
  const [data, setData] = useState<NetworkState | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchNetworkState = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const state = await getNetworkState()
      setData(state)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get network state'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNetworkState()

    const unsubscribe = subscribeToNetworkChanges((state) => {
      setData(state)
      setError(null)
    })

    return () => {
      unsubscribe()
    }
  }, [fetchNetworkState])

  return { data, error, isLoading, refetch: fetchNetworkState }
}
