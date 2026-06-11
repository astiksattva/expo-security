import {
  secureSetItem,
  secureGetItem,
  secureDeleteItem,
  KEYS,
} from '../../../store/secureStore'
import { logError } from '../../../utils/errors'
import {
  SessionToken,
  SessionStatus,
  SessionConfig,
  SECURITY_ERRORS,
} from '../types'

const FEATURE_ID = 'session-management'

const DEFAULT_CONFIG: SessionConfig = {
  refreshThresholdMs: 5 * 60 * 1000,
  tokenType: 'Bearer',
}

let sessionConfig: SessionConfig = { ...DEFAULT_CONFIG }

export function configureSession(config: Partial<SessionConfig>): void {
  sessionConfig = { ...sessionConfig, ...config }
}

export async function storeSession(token: SessionToken): Promise<void> {
  try {
    await secureSetItem(KEYS.AUTH_TOKEN, token.accessToken)
    await secureSetItem(KEYS.REFRESH_TOKEN, token.refreshToken)
    await secureSetItem('session_expires_at', String(token.expiresAt))
    await secureSetItem('session_token_type', token.tokenType)
  } catch (error) {
    logError(FEATURE_ID, error)
    throw new Error('Failed to store session token')
  }
}

export async function getSession(): Promise<SessionToken | null> {
  try {
    const accessToken = await secureGetItem(KEYS.AUTH_TOKEN)
    const refreshToken = await secureGetItem(KEYS.REFRESH_TOKEN)
    const expiresAt = await secureGetItem('session_expires_at')
    const tokenType = await secureGetItem('session_token_type')

    if (!accessToken || !refreshToken || !expiresAt || !tokenType) {
      return null
    }

    return {
      accessToken,
      refreshToken,
      tokenType,
      expiresAt: Number(expiresAt),
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    return null
  }
}

export async function getSessionStatus(): Promise<SessionStatus> {
  try {
    const session = await getSession()
    if (!session) {
      return {
        isValid: false,
        expiresAt: null,
        timeRemaining: null,
        needsRefresh: false,
      }
    }

    const now = Date.now()
    const timeRemaining = session.expiresAt - now
    const isValid = timeRemaining > 0
    const needsRefresh = isValid && timeRemaining < sessionConfig.refreshThresholdMs

    return {
      isValid,
      expiresAt: session.expiresAt,
      timeRemaining,
      needsRefresh,
    }
  } catch (error) {
    logError(FEATURE_ID, error)
    return {
      isValid: false,
      expiresAt: null,
      timeRemaining: null,
      needsRefresh: false,
    }
  }
}

export async function refreshSession(
  refreshFn: (refreshToken: string) => Promise<SessionToken>,
): Promise<SessionToken | null> {
  try {
    const session = await getSession()
    if (!session?.refreshToken) {
      throw new Error(SECURITY_ERRORS.SESSION_EXPIRED)
    }

    const newSession = await refreshFn(session.refreshToken)
    await storeSession(newSession)
    return newSession
  } catch (error) {
    logError(FEATURE_ID, error)
    return null
  }
}

export async function clearSession(): Promise<void> {
  try {
    await secureDeleteItem(KEYS.AUTH_TOKEN)
    await secureDeleteItem(KEYS.REFRESH_TOKEN)
    await secureDeleteItem('session_expires_at')
    await secureDeleteItem('session_token_type')
  } catch (error) {
    logError(FEATURE_ID, error)
  }
}

export async function isSessionValid(): Promise<boolean> {
  const status = await getSessionStatus()
  return status.isValid
}

export function getSessionConfig(): SessionConfig {
  return { ...sessionConfig }
}
