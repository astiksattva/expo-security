export type BiometricType = 'fingerprint' | 'faceId' | 'iris'

export interface BiometricAuthResult {
  success: boolean
  error?: string
  biometricType?: BiometricType
}

export interface BiometricStatus {
  isAvailable: boolean
  isEnrolled: boolean
  biometryType?: BiometricType
}

export interface SecureStorageResult {
  success: boolean
  value?: string
  error?: string
}

export interface SecureStorageEntry {
  key: string
  value: string
  createdAt?: Date
}

export interface AuthState {
  isAuthenticated: boolean
  authenticationType?: 'biometric' | 'deviceCredential'
  lastAuthenticatedAt?: Date
}

export type AuthFeatureId = 'fingerprint' | 'face-id' | 'device-credential' | 'secure-storage'

export const AUTH_ERRORS = {
  HARDWARE_UNAVAILABLE: 'Biometric hardware is not available on this device',
  NOT_ENROLLED: 'No biometric credentials are enrolled on this device',
  AUTHENTICATION_FAILED: 'Authentication failed',
  CANCELLED: 'Authentication was cancelled',
  LOCKOUT: 'Too many attempts. Biometric authentication is locked out.',
  STORAGE_WRITE_FAILED: 'Failed to write to secure storage',
  STORAGE_READ_FAILED: 'Failed to read from secure storage',
  STORAGE_DELETE_FAILED: 'Failed to delete from secure storage',
  NOT_SUPPORTED_ON_PLATFORM: 'This feature is not supported on the current platform',
} as const
