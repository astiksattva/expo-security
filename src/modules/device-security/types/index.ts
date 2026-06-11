export type DeviceSecurityFeatureId =
  | 'root-detect'
  | 'jailbreak-detect'
  | 'emulator-detect'
  | 'dev-mode-detect'
  | 'mock-location-detect'

export type DetectionConfidence = 'low' | 'medium' | 'high'

export type DetectionStatus = 'idle' | 'scanning' | 'complete' | 'error'

export interface RootDetectResult {
  isRooted: boolean
  detections: string[]
  confidence: DetectionConfidence
}

export interface JailbreakDetectResult {
  isJailbroken: boolean
  detections: string[]
  confidence: DetectionConfidence
}

export interface EmulatorDetectResult {
  isEmulator: boolean
  detections: string[]
}

export interface DevModeDetectResult {
  isDevModeEnabled: boolean
  detections: string[]
}

export interface MockLocationDetectResult {
  isMockLocationEnabled: boolean
  detections: string[]
}

export interface DetectionState<T> {
  status: DetectionStatus
  data: T | null
  error: string | null
}

export const DEVICE_SECURITY_ERRORS = {
  HARDWARE_UNAVAILABLE: 'Required hardware is not available on this device',
  PERMISSION_DENIED: 'Required permission has been denied',
  PLATFORM_NOT_SUPPORTED: 'This feature is not supported on the current platform',
  DETECTION_FAILED: 'Detection check failed',
  ANDROID_ONLY: 'This feature is only available on Android',
  IOS_ONLY: 'This feature is only available on iOS',
} as const
