import { useState, useEffect, useCallback, useRef } from 'react'
import { ShakeState, MonitoringResult } from '../types'
import {
  isAccelerometerAvailable,
  startShakeDetection,
  ShakeDetectionConfig,
} from '../services/shakeService'

interface UseShakeReturn extends MonitoringResult<ShakeState> {
  isAvailable: boolean
  startMonitoring: () => void
  stopMonitoring: () => void
  isMonitoring: boolean
  resetShakeCount: () => void
}

export function useShake(config?: ShakeDetectionConfig): UseShakeReturn {
  const [data, setData] = useState<ShakeState>({
    isShaking: false,
    lastShakeTimestamp: null,
    shakeCount: 0,
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAvailable, setIsAvailable] = useState(false)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const cleanupRef = useRef<(() => void) | null>(null)

  const checkAvailability = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const available = await isAccelerometerAvailable()
      setIsAvailable(available)
      if (!available) {
        setError('Accelerometer is not available on this device')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to check accelerometer availability'
      setError(message)
      setIsAvailable(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAvailability()
  }, [checkAvailability])

  const startMonitoring = useCallback(() => {
    if (!isAvailable || isMonitoring) return

    const cleanup = startShakeDetection(
      (event) => {
        setData((prev) => ({
          isShaking: true,
          lastShakeTimestamp: event.timestamp,
          shakeCount: prev.shakeCount + 1,
        }))

        setTimeout(() => {
          setData((prev) => ({ ...prev, isShaking: false }))
        }, 300)
      },
      config,
    )

    cleanupRef.current = cleanup
    setIsMonitoring(true)
  }, [isAvailable, isMonitoring, config])

  const stopMonitoring = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }
    setIsMonitoring(false)
  }, [])

  const resetShakeCount = useCallback(() => {
    setData((prev) => ({ ...prev, shakeCount: 0 }))
  }, [])

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [])

  return {
    data,
    error,
    isLoading,
    isAvailable,
    startMonitoring,
    stopMonitoring,
    isMonitoring,
    resetShakeCount,
  }
}
