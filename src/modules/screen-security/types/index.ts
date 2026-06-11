export interface ScreenshotDetectState {
  detected: boolean
  timestamp: number | null
  listenerActive: boolean
}

export interface ScreenshotPreventState {
  isPrevented: boolean
  available: boolean
}

export interface RecordingDetectState {
  isRecording: boolean
  available: boolean
}

export interface RecordingPreventState {
  isPrevented: boolean
  available: boolean
}

export interface CastingDetectState {
  isCasting: boolean
  available: boolean
}

export type ScreenSecurityFeatureId =
  | 'screenshot-detect'
  | 'screenshot-prevent'
  | 'recording-detect'
  | 'recording-prevent'
  | 'casting-detect'

export interface DemoResult {
  featureId: ScreenSecurityFeatureId
  success: boolean
  message: string
  timestamp: number
}
