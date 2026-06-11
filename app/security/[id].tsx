import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SslPinningScreen } from '../../src/modules/security/screens/SslPinningScreen'
import { SessionManagementScreen } from '../../src/modules/security/screens/SessionManagementScreen'
import { AutoLogoutScreen } from '../../src/modules/security/screens/AutoLogoutScreen'
import { DeviceBindingScreen } from '../../src/modules/security/screens/DeviceBindingScreen'
import { ForceUpdateScreen } from '../../src/modules/security/screens/ForceUpdateScreen'
import { ErrorState } from '../../src/components/ErrorState'

const SCREENS: Record<string, React.ComponentType> = {
  'ssl-pinning': SslPinningScreen,
  'session-management': SessionManagementScreen,
  'auto-logout': AutoLogoutScreen,
  'device-binding': DeviceBindingScreen,
  'force-update': ForceUpdateScreen,
}

export default function SecurityFeatureRoute() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const Screen = id ? SCREENS[id] : undefined
  if (!Screen) return <ErrorState message={`Feature "${id}" not found`} />
  return <Screen />
}
