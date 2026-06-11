export interface CertificatePin {
  host: string
  hash: string
  algorithm: 'sha256' | 'sha1'
}

export interface SslPinningConfig {
  pins: CertificatePin[]
  validateHostname: boolean
}

export interface SslPinningResult {
  isValid: boolean
  host: string
  error?: string
}

export interface SessionToken {
  accessToken: string
  refreshToken: string
  expiresAt: number
  tokenType: string
}

export interface SessionStatus {
  isValid: boolean
  expiresAt: number | null
  timeRemaining: number | null
  needsRefresh: boolean
}

export interface SessionConfig {
  refreshThresholdMs: number
  tokenType: string
}

export interface AutoLogoutConfig {
  timeoutMs: number
  warningMs: number
  enabled: boolean
}

export interface AutoLogoutStatus {
  isTimedOut: boolean
  lastActivity: number | null
  timeRemaining: number | null
}

export interface InactivityWarning {
  showWarning: boolean
  timeUntilLogout: number
}

export interface DeviceBindingInfo {
  deviceId: string
  boundAt: number
  lastVerified: number
}

export interface DeviceBindingStatus {
  isBound: boolean
  isVerified: boolean
  deviceId: string | null
}

export interface BindingConfig {
  requireBinding: boolean
  verifyOnLaunch: boolean
}

export interface VersionInfo {
  currentVersion: string
  minVersion: string
  latestVersion: string
}

export interface UpdateStatus {
  needsUpdate: boolean
  isOptional: boolean
  updateUrl: string | null
}

export interface ForceUpdateConfig {
  checkOnLaunch: boolean
  checkIntervalMs: number
}

export type SecurityFeatureId =
  | 'ssl-pinning'
  | 'session-management'
  | 'auto-logout'
  | 'device-binding'
  | 'force-update'

export interface SecureRequestOptions {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: unknown
}

export const SECURITY_ERRORS = {
  PIN_MISMATCH: 'Certificate pin mismatch for host',
  NO_PINS_CONFIGURED: 'No SSL pins configured for host',
  SESSION_EXPIRED: 'Session has expired',
  SESSION_INVALID: 'Session token is invalid',
  INACTIVITY_TIMEOUT: 'User inactive for too long',
  DEVICE_NOT_BOUND: 'Device is not bound to this session',
  DEVICE_MISMATCH: 'Device ID does not match bound device',
  VERSION_CHECK_FAILED: 'Failed to check app version',
  UPDATE_REQUIRED: 'App update is required',
  PLATFORM_NOT_SUPPORTED: 'This feature is not supported on the current platform',
} as const
