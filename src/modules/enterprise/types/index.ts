export type EnterpriseFeatureId =
  | 'push-notifications'
  | 'deep-linking'
  | 'qr-scanner'
  | 'nfc'
  | 'analytics'
  | 'crash-reporting'

export interface NotificationPermission {
  granted: boolean
  status: NotificationPermissionStatus
}

export type NotificationPermissionStatus = 'granted' | 'denied' | 'undetermined' | 'provisional'

export interface PushToken {
  data: string
  type: string
}

export interface NotificationData {
  title: string
  body: string
  data?: Record<string, string>
}

export interface DeepLink {
  url: string
  path: string | null
  queryParams: Record<string, string> | null
  route: string | null
}

export interface ScanResult {
  data: string
  type: string
  raw?: string
}

export interface NFCReadResult {
  id: string
  type: string
  payload: string
  techTypes: string[]
}

export interface NFCTag {
  id: string
  records: NFCReadResult[]
}

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, string | number | boolean>
  timestamp: number
}

export interface CrashReport {
  id: string
  error: string
  stackTrace: string
  timestamp: number
  context?: Record<string, string>
}

export interface FeatureState<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}

export interface PermissionState {
  camera: boolean
  notifications: boolean
  nfc: boolean
}

export const ENTERPRISE_ERRORS = {
  PERMISSION_DENIED: 'Permission denied for this feature',
  NOT_SUPPORTED: 'This feature is not supported on this device',
  HARDWARE_UNAVAILABLE: 'Required hardware is not available',
  SCAN_FAILED: 'Failed to scan',
  READ_FAILED: 'Failed to read data',
  WRITE_FAILED: 'Failed to write data',
  INIT_FAILED: 'Failed to initialize',
  SUBSCRIPTION_FAILED: 'Failed to subscribe',
  TOKEN_FAILED: 'Failed to get token',
  LINK_FAILED: 'Failed to process link',
  TRACK_FAILED: 'Failed to track event',
  REPORT_FAILED: 'Failed to report crash',
  CAMERA_PERMISSION_DENIED: 'Camera permission is required for scanning',
  NOTIFICATION_PERMISSION_DENIED: 'Notification permission is required',
} as const
