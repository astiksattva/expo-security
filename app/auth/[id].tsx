import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { FingerprintScreen } from '../../src/modules/auth/screens/FingerprintScreen'
import { FaceIdScreen } from '../../src/modules/auth/screens/FaceIdScreen'
import { DeviceCredentialScreen } from '../../src/modules/auth/screens/DeviceCredentialScreen'
import { SecureStorageScreen } from '../../src/modules/auth/screens/SecureStorageScreen'
import { ErrorState } from '../../src/components/ErrorState'

const SCREENS: Record<string, React.ComponentType> = {
  fingerprint: FingerprintScreen,
  'face-id': FaceIdScreen,
  'device-credential': DeviceCredentialScreen,
  'secure-storage': SecureStorageScreen,
}

export default function AuthFeatureRoute() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const Screen = id ? SCREENS[id] : undefined
  if (!Screen) return <ErrorState message={`Feature "${id}" not found`} />
  return <Screen />
}
