import { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { useAppStore } from '../../../store/appStore'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useFingerprint } from '../hooks/useFingerprint'
import { isAndroid, isIOS } from '../../../utils/platform'

export function FingerprintScreen() {
  const isDemoMode = useAppStore((s) => s.isDemoMode)
  const { status, isLoading, error, result, checkStatus, authenticate, reset } =
    useFingerprint()

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  if (isLoading && !status) {
    return <LoadingState message="Checking fingerprint availability..." />
  }

  if (error && !result) {
    return <ErrorState message={error} onRetry={checkStatus} />
  }

  if (!isIOS && !isAndroid) {
    return (
      <EmptyState
        title="Not Supported"
        message="Fingerprint authentication is not available on this platform."
      />
    )
  }

  if (status && !status.isAvailable && !isDemoMode) {
    return (
      <EmptyState
        title="Fingerprint Unavailable"
        message={
          status.biometryType === undefined
            ? 'This device does not have fingerprint hardware.'
            : 'No fingerprints are enrolled on this device.'
        }
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fingerprint Authentication</Text>

      {isDemoMode && (
        <Text style={styles.demoBadge}>Demo Mode</Text>
      )}

      {status && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status</Text>
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

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={authenticate}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Authenticating...' : 'Authenticate with Fingerprint'}
        </Text>
      </TouchableOpacity>

      {isLoading && <LoadingState message="Waiting for fingerprint..." />}

      {result && result.success && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Authentication Successful</Text>
        </View>
      )}

      {result && !result.success && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{result.error}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={reset}>
        <Text style={styles.resetText}>Reset</Text>
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
    marginBottom: Spacing.md,
  },
  demoBadge: {
    fontSize: FontSize.sm,
    color: Colors.warning,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: Spacing.sm,
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
