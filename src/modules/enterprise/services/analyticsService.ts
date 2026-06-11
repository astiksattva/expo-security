import { logError } from '../../../utils/errors'
import { AnalyticsEvent, ENTERPRISE_ERRORS } from '../types'

const FEATURE_ID = 'analytics'

const MAX_STORED_EVENTS = 1000

let eventBuffer: AnalyticsEvent[] = []

export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean>,
): void {
  try {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now(),
    }

    eventBuffer.push(event)

    if (eventBuffer.length > MAX_STORED_EVENTS) {
      eventBuffer = eventBuffer.slice(-MAX_STORED_EVENTS)
    }
  } catch (error) {
    logError(FEATURE_ID, error)
  }
}

export function getBufferedEvents(): readonly AnalyticsEvent[] {
  return eventBuffer
}

export function clearBuffer(): void {
  eventBuffer = []
}

export function flushEvents(): Promise<void> {
  try {
    const events = [...eventBuffer]
    clearBuffer()

    if (events.length > 0) {
      return sendEvents(events)
    }

    return Promise.resolve()
  } catch (error) {
    logError(FEATURE_ID, error)
    return Promise.reject(new Error(ENTERPRISE_ERRORS.TRACK_FAILED))
  }
}

async function sendEvents(events: AnalyticsEvent[]): Promise<void> {
  try {
    const response = await fetch('https://api.example.com/analytics/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events, sentAt: Date.now() }),
    })

    if (!response.ok) {
      throw new Error(`Analytics server returned ${response.status}`)
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    eventBuffer = [...events, ...eventBuffer]

    if (eventBuffer.length > MAX_STORED_EVENTS) {
      eventBuffer = eventBuffer.slice(-MAX_STORED_EVENTS)
    }

    throw error
  }
}

export function getEventCount(): number {
  return eventBuffer.length
}

export function createScreenViewEvent(screenName: string): AnalyticsEvent {
  return {
    name: 'screen_view',
    properties: { screen: screenName },
    timestamp: Date.now(),
  }
}

export function createUserActionEvent(
  action: string,
  details?: Record<string, string | number | boolean>,
): AnalyticsEvent {
  return {
    name: `user_action_${action}`,
    properties: details,
    timestamp: Date.now(),
  }
}
