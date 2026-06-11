import { useState, useEffect, useCallback, useRef } from 'react'
import * as Notifications from 'expo-notifications'
import {
  requestNotificationPermission,
  getPushToken,
  sendLocalNotification,
  addNotificationListener,
  addNotificationResponseListener,
  removeNotificationListener,
  setupAndroidChannel,
} from '../services/pushNotificationService'
import { NotificationPermission, PushToken, NotificationData } from '../types'

interface UsePushNotificationsReturn {
  permission: NotificationPermission | null
  token: PushToken | null
  lastNotification: Notifications.Notification | null
  lastResponse: Notifications.NotificationResponse | null
  isLoading: boolean
  error: string | null
  requestPermission: () => Promise<void>
  sendTestNotification: (data: NotificationData) => Promise<void>
}

export function usePushNotifications(): UsePushNotificationsReturn {
  const [permission, setPermission] = useState<NotificationPermission | null>(null)
  const [token, setToken] = useState<PushToken | null>(null)
  const [lastNotification, setLastNotification] = useState<Notifications.Notification | null>(null)
  const [lastResponse, setLastResponse] = useState<Notifications.NotificationResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const notificationSubRef = useRef<Notifications.EventSubscription | null>(null)
  const responseSubRef = useRef<Notifications.EventSubscription | null>(null)

  useEffect(() => {
    setupAndroidChannel()

    notificationSubRef.current = addNotificationListener((notification) => {
      setLastNotification(notification)
    })

    responseSubRef.current = addNotificationResponseListener((response) => {
      setLastResponse(response)
    })

    return () => {
      if (notificationSubRef.current) {
        removeNotificationListener(notificationSubRef.current)
      }
      if (responseSubRef.current) {
        removeNotificationListener(responseSubRef.current)
      }
    }
  }, [])

  const requestPermission = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const perm = await requestNotificationPermission()
      setPermission(perm)

      if (perm.granted) {
        const pushToken = await getPushToken()
        setToken(pushToken)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to request permission'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const sendTestNotification = useCallback(async (data: NotificationData) => {
    setIsLoading(true)
    setError(null)
    try {
      await sendLocalNotification(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send notification'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    permission,
    token,
    lastNotification,
    lastResponse,
    isLoading,
    error,
    requestPermission,
    sendTestNotification,
  }
}
