import { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { useAppStore } from '../../../store/appStore'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useFaceId } from '../hooks/useFaceId'
import { isIOS } from '../../../utils/platform'

export function FaceIdDemoScreen() {
  const isDemoMode = useAppStore((s) => s.isDemoMode)
  const { status, isLoading, error, result, checkStatus, authenticate, reset } =
    useFaceId()

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  if (!isDemoMode) {
    useAppStore.getState().setDemoMode(true)
  }

  if (isLoading && !status) {
    return <LoadingState message="Checking Face ID availability..." />
  }

  if (error && !result) {
    return <ErrorState message={error} onRetry={checkStatus} />
  }

  if (!isIOS) {
    return (
      <EmptyState
        title="Not Supported"
        message="Face ID is only available on iOS devices."
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Face ID Demo</Text>
      <Text style={styles.subtitle}>Test Face ID authentication in demo mode</Text>

      {status && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Device Status</Text>
          <Text style={styles.statusText}>
            Hardware: {status.isAvailable ? 'Available' : 'Unavailable'}
          </Text>
          <Text style={styles.statusText}>
            Enrolled: {status.isEnrolled ? 'Yes' : 'No'}
          </Text>
          {status.biometryType && (
            <Text style={styles.statusText}>
              Type: {status.biometryType}
            </Text>
          )}
        </View>
      )}

      <View style={styles.demoInfo}>
        <Text style={styles.demoInfoText}>
          In demo mode, authentication is simulated. Real Face ID authentication
          requires an iOS device with Face ID hardware and Face ID enrolled.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={authenticate}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Authenticating...' : 'Simulate Face ID Auth'}
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
