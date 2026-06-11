import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { RootDetectScreen } from '../../src/modules/device-security/screens/RootDetectScreen'
import { JailbreakDetectScreen } from '../../src/modules/device-security/screens/JailbreakDetectScreen'
import { EmulatorDetectScreen } from '../../src/modules/device-security/screens/EmulatorDetectScreen'
import { DevModeDetectScreen } from '../../src/modules/device-security/screens/DevModeDetectScreen'
import { MockLocationDetectScreen } from '../../src/modules/device-security/screens/MockLocationDetectScreen'
import { ErrorState } from '../../src/components/ErrorState'

const SCREENS: Record<string, React.ComponentType> = {
  'root-detect': RootDetectScreen,
  'jailbreak-detect': JailbreakDetectScreen,
  'emulator-detect': EmulatorDetectScreen,
  'dev-mode-detect': DevModeDetectScreen,
  'mock-location-detect': MockLocationDetectScreen,
}

export default function DeviceSecurityFeatureRoute() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const Screen = id ? SCREENS[id] : undefined
  if (!Screen) return <ErrorState message={`Feature "${id}" not found`} />
  return <Screen />
}
