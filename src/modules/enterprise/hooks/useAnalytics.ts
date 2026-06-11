import { useState, useCallback, useEffect } from 'react'
import {
  trackEvent,
  getBufferedEvents,
  clearBuffer,
  flushEvents,
  getEventCount,
  createScreenViewEvent,
  createUserActionEvent,
} from '../services/analyticsService'
import { AnalyticsEvent } from '../types'

interface UseAnalyticsReturn {
  events: readonly AnalyticsEvent[]
  eventCount: number
  isFlushing: boolean
  error: string | null
  track: (name: string, properties?: Record<string, string | number | boolean>) => void
  trackScreenView: (screenName: string) => void
  trackUserAction: (action: string, details?: Record<string, string | number | boolean>) => void
  flush: () => Promise<void>
  clear: () => void
  refresh: () => void
}

export function useAnalytics(): UseAnalyticsReturn {
  const [events, setEvents] = useState<readonly AnalyticsEvent[]>([])
  const [eventCount, setEventCount] = useState(0)
  const [isFlushing, setIsFlushing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    refresh()
  }, [])

  const refresh = useCallback(() => {
    setEvents(getBufferedEvents())
    setEventCount(getEventCount())
  }, [])

  const track = useCallback(
    (name: string, properties?: Record<string, string | number | boolean>) => {
      trackEvent(name, properties)
      refresh()
    },
    [refresh],
  )

  const trackScreenView = useCallback(
    (screenName: string) => {
      const event = createScreenViewEvent(screenName)
      trackEvent(event.name, event.properties)
      refresh()
    },
    [refresh],
  )

  const trackUserAction = useCallback(
    (action: string, details?: Record<string, string | number | boolean>) => {
      const event = createUserActionEvent(action, details)
      trackEvent(event.name, event.properties)
      refresh()
    },
    [refresh],
  )

  const flush = useCallback(async () => {
    setIsFlushing(true)
    setError(null)
    try {
      await flushEvents()
      refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to flush events'
      setError(message)
    } finally {
      setIsFlushing(false)
    }
  }, [refresh])

  const clear = useCallback(() => {
    clearBuffer()
    refresh()
  }, [refresh])

  return {
    events,
    eventCount,
    isFlushing,
    error,
    track,
    trackScreenView,
    trackUserAction,
    flush,
    clear,
    refresh,
  }
}
