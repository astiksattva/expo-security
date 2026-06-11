import { useState, useEffect, useCallback } from 'react'
import { BatteryState, MonitoringResult } from '../types'
import {
  getBatteryState,
  subscribeToBatteryLevelChanges,
  subscribeToBatteryStateChanges,
  subscribeToLowPowerModeChanges,
} from '../services/batteryService'

interface UseBatteryReturn extends MonitoringResult<BatteryState> {
  refetch: () => Promise<void>
}

export function useBattery(): UseBatteryReturn {
  const [data, setData] = useState<BatteryState | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchBatteryState = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const state = await getBatteryState()
      setData(state)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get battery state'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBatteryState()

    const unsubLevel = subscribeToBatteryLevelChanges((level) => {
      setData((prev) => prev ? { ...prev, level } : null)
    })

    const unsubState = subscribeToBatteryStateChanges((state) => {
      setData(state)
    })

    const unsubLowPower = subscribeToLowPowerModeChanges((lowPowerMode) => {
      setData((prev) => prev ? { ...prev, lowPowerMode } : null)
    })

    return () => {
      unsubLevel()
      unsubState()
      unsubLowPower()
    }
  }, [fetchBatteryState])

  return { data, error, isLoading, refetch: fetchBatteryState }
}
