import { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { useAppStore } from '../../../store/appStore'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useDeviceCredential } from '../hooks/useDeviceCredential'
import { isIOS, isAndroid } from '../../../utils/platform'

export function DeviceCredentialDemoScreen() {
  const isDemoMode = useAppStore((s) => s.isDemoMode)
  const {
    isAvailable,
    isLoading,
    error,
    result,
    checkAvailability,
    authenticate,
    reset,
  } = useDeviceCredential()

  useEffect(() => {
    checkAvailability()
  }, [checkAvailability])

  if (!isDemoMode) {
    useAppStore.getState().setDemoMode(true)
  }

  if (isLoading && !result) {
    return <LoadingState message="Checking device credential availability..." />
  }

  if (error && !result) {
    return <ErrorState message={error} onRetry={checkAvailability} />
  }

  if (!isIOS && !isAndroid) {
    return (
      <EmptyState
        title="Not Supported"
        message="Device credential authentication is not available on this platform."
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Credential Demo</Text>
      <Text style={styles.subtitle}>Test device passcode authentication in demo mode</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status</Text>
        <Text style={styles.statusText}>
          Available: {isAvailable ? 'Yes' : 'No'}
        </Text>
      </View>

      <View style={styles.demoInfo}>
        <Text style={styles.demoInfoText}>
          In demo mode, device credential authentication is simulated. Real
          authentication requires a device with a passcode, PIN, or pattern set.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={authenticate}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Authenticating...' : 'Simulate Device Credential Auth'}
        </Text>
      </TouchableOpacity>

      {isLoading && <LoadingState message="Simulating authentication..." />}

      {result && result.success && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Demo Authentication Successful</Text>
        </View>
      )}

      {result && !result.success && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{result.error}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={reset}>
        <Text style={styles.resetText}>Reset Demo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  statusContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statusText: {
    fontSize: FontSize.md,
    color: Colors.text,
  },
  demoInfo: {
    backgroundColor: Colors.warning + '20',
    borderRadius: 10,
    padding: Spacing.md,
  },
  demoInfoText: {
    fontSize: FontSize.sm,
    color: Colors.text,
    lineHeight: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  successContainer: {
    backgroundColor: Colors.success + '20',
    borderRadius: 10,
    padding: Spacing.md,
    alignItems: 'center',
  },
  successText: {
    color: Colors.success,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: Colors.error + '20',
    borderRadius: 10,
    padding: Spacing.md,
    alignItems: 'center',
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSize.md,
    textAlign: 'center',
  },
  resetButton: {
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  resetText: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },
})
