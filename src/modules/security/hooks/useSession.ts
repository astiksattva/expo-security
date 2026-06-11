import { useState, useCallback } from 'react'
import { SessionToken, SessionStatus, SessionConfig } from '../types'
import {
  storeSession,
  getSession,
  getSessionStatus,
  clearSession,
  refreshSession,
  configureSession,
  isSessionValid,
  getSessionConfig,
} from '../services/sessionService'

interface UseSessionReturn {
  session: SessionToken | null
  status: SessionStatus | null
  isLoading: boolean
  error: string | null
  login: (token: SessionToken) => Promise<void>
  logout: () => Promise<void>
  checkStatus: () => Promise<void>
  refresh: (
    refreshFn: (refreshToken: string) => Promise<SessionToken>,
  ) => Promise<void>
  configure: (config: Partial<SessionConfig>) => void
  validate: () => Promise<boolean>
}

export function useSession(): UseSessionReturn {
  const [session, setSession] = useState<SessionToken | null>(null)
  const [status, setStatus] = useState<SessionStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (token: SessionToken) => {
    setIsLoading(true)
    setError(null)
    try {
      await storeSession(token)
      setSession(token)
      const sessionStatus = await getSessionStatus()
      setStatus(sessionStatus)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to store session token',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      await clearSession()
      setSession(null)
      setStatus(null)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to clear session',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const checkStatus = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const currentSession = await getSession()
      setSession(currentSession)
      const sessionStatus = await getSessionStatus()
      setStatus(sessionStatus)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to check session status',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleRefresh = useCallback(
    async (
      refreshFn: (refreshToken: string) => Promise<SessionToken>,
    ) => {
      setIsLoading(true)
      setError(null)
      try {
        const newSession = await refreshSession(refreshFn)
        if (newSession) {
          setSession(newSession)
          const sessionStatus = await getSessionStatus()
          setStatus(sessionStatus)
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to refresh session',
        )
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  const handleConfigure = useCallback((cfg: Partial<SessionConfig>) => {
    configureSession(cfg)
  }, [])

  const validate = useCallback(async () => {
    const valid = await isSessionValid()
    if (!valid) {
      setStatus((prev) => (prev ? { ...prev, isValid: false } : null))
    }
    return valid
  }, [])

  return {
    session,
    status,
    isLoading,
    error,
    login,
    logout,
    checkStatus,
    refresh: handleRefresh,
    configure: handleConfigure,
    validate,
  }
}
