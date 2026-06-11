import { useState, useEffect, useCallback } from 'react'
import { LocationState, LocationPermissionStatus, MonitoringResult } from '../types'
import {
  getCurrentLocation,
  requestLocationPermission,
  getLocationPermissionStatus,
  watchLocation,
} from '../services/locationService'

interface UseLocationReturn extends MonitoringResult<LocationState> {
  permission: LocationPermissionStatus | null
  requestPermission: () => Promise<void>
  refetch: () => Promise<void>
  startWatching: () => void
  stopWatching: () => void
  isWatching: boolean
}

export function useLocation(): UseLocationReturn {
  const [data, setData] = useState<LocationState | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [permission, setPermission] = useState<LocationPermissionStatus | null>(null)
  const [isWatching, setIsWatching] = useState(false)
  const [watchCleanup, setWatchCleanup] = useState<(() => void) | null>(null)

  const checkPermission = useCallback(async () => {
    try {
      const status = await getLocationPermissionStatus()
      setPermission(status)
      return status
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to check location permission'
      setError(message)
      return null
    }
  }, [])

  const fetchLocation = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const state = await getCurrentLocation()
      setData(state)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get location'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const requestPermission = useCallback(async () => {
    try {
      setError(null)
      const status = await requestLocationPermission()
      setPermission(status)
      if (status.granted) {
        await fetchLocation()
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to request location permission'
      setError(message)
    }
  }, [fetchLocation])

  const startWatching = useCallback(async () => {
    if (isWatching) return
    setIsWatching(true)

    const cleanup = await watchLocation(
      (location) => {
        setData(location)
        setError(null)
      },
      (err) => {
        setError(err.message)
        setIsWatching(false)
      },
    )

    setWatchCleanup(() => cleanup)
  }, [isWatching])

  const stopWatching = useCallback(() => {
    if (watchCleanup) {
      watchCleanup()
      setWatchCleanup(null)
    }
    setIsWatching(false)
  }, [watchCleanup])

  useEffect(() => {
    checkPermission()
  }, [checkPermission])

  useEffect(() => {
    return () => {
      if (watchCleanup) {
        watchCleanup()
      }
    }
  }, [watchCleanup])

  return {
    data,
    error,
    isLoading,
    permission,
    requestPermission,
    refetch: fetchLocation,
    startWatching,
    stopWatching,
    isWatching,
  }
}
