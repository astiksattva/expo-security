import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ScreenshotDetectScreen } from '../../src/modules/screen-security/screens/ScreenshotDetectScreen'
import { ScreenshotPreventScreen } from '../../src/modules/screen-security/screens/ScreenshotPreventScreen'
import { RecordingDetectScreen } from '../../src/modules/screen-security/screens/RecordingDetectScreen'
import { RecordingPreventScreen } from '../../src/modules/screen-security/screens/RecordingPreventScreen'
import { CastingDetectScreen } from '../../src/modules/screen-security/screens/CastingDetectScreen'
import { ErrorState } from '../../src/components/ErrorState'

const SCREENS: Record<string, React.ComponentType> = {
  'screenshot-detect': ScreenshotDetectScreen,
  'screenshot-prevent': ScreenshotPreventScreen,
  'recording-detect': RecordingDetectScreen,
  'recording-prevent': RecordingPreventScreen,
  'casting-detect': CastingDetectScreen,
}

export default function ScreenSecurityFeatureRoute() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const Screen = id ? SCREENS[id] : undefined
  if (!Screen) return <ErrorState message={`Feature "${id}" not found`} />
  return <Screen />
}
