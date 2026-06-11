import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { PushNotificationsScreen } from '../../src/modules/enterprise/screens/PushNotificationsScreen'
import { DeepLinkingScreen } from '../../src/modules/enterprise/screens/DeepLinkingScreen'
import { QRScannerScreen } from '../../src/modules/enterprise/screens/QRScannerScreen'
import { NFCScreen } from '../../src/modules/enterprise/screens/NFCScreen'
import { AnalyticsScreen } from '../../src/modules/enterprise/screens/AnalyticsScreen'
import { CrashReportingScreen } from '../../src/modules/enterprise/screens/CrashReportingScreen'
import { ErrorState } from '../../src/components/ErrorState'

const SCREENS: Record<string, React.ComponentType> = {
  'push-notifications': PushNotificationsScreen,
  'deep-linking': DeepLinkingScreen,
  'qr-scanner': QRScannerScreen,
  nfc: NFCScreen,
  analytics: AnalyticsScreen,
  'crash-reporting': CrashReportingScreen,
}

export default function EnterpriseFeatureRoute() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const Screen = id ? SCREENS[id] : undefined
  if (!Screen) return <ErrorState message={`Feature "${id}" not found`} />
  return <Screen />
}
