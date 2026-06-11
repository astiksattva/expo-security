import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { NetworkDetectScreen } from '../../src/modules/device-monitoring/screens/NetworkDetectScreen'
import { BatteryDetectScreen } from '../../src/modules/device-monitoring/screens/BatteryDetectScreen'
import { LocationDetectScreen } from '../../src/modules/device-monitoring/screens/LocationDetectScreen'
import { ShakeDetectScreen } from '../../src/modules/device-monitoring/screens/ShakeDetectScreen'
import { AppStateScreen } from '../../src/modules/device-monitoring/screens/AppStateScreen'
import { ErrorState } from '../../src/components/ErrorState'

const SCREENS: Record<string, React.ComponentType> = {
  'network-detect': NetworkDetectScreen,
  'battery-detect': BatteryDetectScreen,
  'location-detect': LocationDetectScreen,
  'shake-detect': ShakeDetectScreen,
  'app-state': AppStateScreen,
}

export default function DeviceMonitoringFeatureRoute() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const Screen = id ? SCREENS[id] : undefined
  if (!Screen) return <ErrorState message={`Feature "${id}" not found`} />
  return <Screen />
}
