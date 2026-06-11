export interface NetworkState {
  isConnected: boolean
  type: NetworkType
  isInternetReachable: boolean | null
}

export type NetworkType = 'wifi' | 'cellular' | 'none' | 'unknown' | 'vpn' | 'ethernet' | 'bluetooth' | 'other'

export interface BatteryState {
  level: number
  isCharging: boolean
  state: BatteryChargeState
  lowPowerMode: boolean
}

export type BatteryChargeState = 'charging' | 'full' | 'unplugged' | 'unknown'

export interface LocationState {
  latitude: number
  longitude: number
  altitude: number | null
  accuracy: number | null
  speed: number | null
  timestamp: number
}

export interface LocationPermissionStatus {
  granted: boolean
  canAskAgain: boolean
  status: 'granted' | 'denied' | 'undetermined' | 'blocked'
}

export interface ShakeState {
  isShaking: boolean
  lastShakeTimestamp: number | null
  shakeCount: number
}

export interface AppStateInfo {
  state: AppVisibilityState
  previousState: AppVisibilityState | null
  timeInBackground: number
  timeInForeground: number
}

export type AppVisibilityState = 'active' | 'inactive' | 'background' | 'unknown'

export interface DeviceMonitoringState {
  network: NetworkState | null
  battery: BatteryState | null
  location: LocationState | null
  shake: ShakeState
  appState: AppStateInfo
  permissions: {
    location: LocationPermissionStatus | null
  }
}

export type DeviceMonitoringFeatureId =
  | 'network-detection'
  | 'battery-detection'
  | 'location-detection'
  | 'shake-detection'
  | 'app-state-monitoring'

export const MONITORING_ERRORS = {
  NETWORK_UNAVAILABLE: 'Network service is not available on this device',
  BATTERY_UNAVAILABLE: 'Battery service is not available on this device',
  LOCATION_UNAVAILABLE: 'Location service is not available on this device',
  SHAKE_UNAVAILABLE: 'Accelerometer is not available on this device',
  PERMISSION_DENIED: 'Location permission was denied',
  PERMISSION_BLOCKED: 'Location permission is permanently blocked',
  LOCATION_DISABLED: 'Location services are disabled on this device',
  APP_STATE_UNAVAILABLE: 'App state monitoring is not available on this device',
  NOT_SUPPORTED_ON_PLATFORM: 'This feature is not supported on the current platform',
} as const

export interface MonitoringResult<T> {
  data: T | null
  error: string | null
  isLoading: boolean
}
