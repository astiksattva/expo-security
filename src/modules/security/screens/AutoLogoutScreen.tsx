import { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { useAutoLogout } from '../hooks/useAutoLogout'

export function AutoLogoutScreen() {
  const {
    status,
    warning,
    isLoading,
    isMonitoring,
    error,
    recordActivity,
    reset,
    start,
    stop,
    checkStatus,
    configure,
  } = useAutoLogout()

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  if (isLoading && !status) {
    return <LoadingState message="Checking auto logout status..." />
  }

  if (error && !status) {
    return <ErrorState message={error} onRetry={checkStatus} />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Auto Logout</Text>
      <Text style={styles.subtitle}>
        Automatically log out inactive users
      </Text>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {warning?.showWarning && (
        <View style={styles.warningBanner}>
          <Text style={styles.warningBannerText}>
            Inactivity warning! Logging out in{' '}
            {Math.ceil(warning.timeUntilLogout / 1000)}s
          </Text>
        </View>
      )}

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Status</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusKey}>Monitoring:</Text>
          <Text
            style={[
              styles.statusValue,
              { color: isMonitoring ? Colors.success : Colors.textSecondary },
            ]}
          >
            {isMonitoring ? 'Active' : 'Inactive'}
          </Text>
        </View>
        {status && (
          <>
            <View style={styles.statusRow}>
              <Text style={styles.statusKey}>Timed Out:</Text>
              <Text
                style={[
                  styles.statusValue,
                  { color: status.isTimedOut ? Colors.error : Colors.success },
                ]}
              >
                {status.isTimedOut ? 'Yes' : 'No'}
              </Text>
            </View>
            {status.lastActivity && (
              <View style={styles.statusRow}>
                <Text style={styles.statusKey}>Last Activity:</Text>
                <Text style={styles.statusValue}>
                  {new Date(status.lastActivity).toLocaleTimeString()}
                </Text>
              </View>
            )}
            {status.timeRemaining != null && (
              <View style={styles.statusRow}>
                <Text style={styles.statusKey}>Time Remaining:</Text>
                <Text style={styles.statusValue}>
                  {Math.floor(status.timeRemaining / 1000)}s
                </Text>
              </View>
            )}
          </>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, isMonitoring && styles.buttonActive]}
          onPress={
            isMonitoring
              ? stop
              : () => start(() => {})
          }
        >
          <Text style={styles.buttonText}>
            {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={recordActivity}>
          <Text style={styles.buttonText}>Record Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={reset}
        >
          <Text style={styles.buttonText}>Reset Timer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration</Text>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Timeout:</Text>
          <Text style={styles.configValue}>15 minutes</Text>
        </View>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Warning:</Text>
          <Text style={styles.configValue}>1 minute before timeout</Text>
        </View>
        <TouchableOpacity
          style={[styles.button, styles.configButton]}
          onPress={() =>
            configure({ timeoutMs: 300000, warningMs: 30000 })
          }
        >
          <Text style={styles.buttonText}>Set 5min Timeout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.configButton]}
          onPress={() =>
            configure({ timeoutMs: 900000, warningMs: 60000 })
          }
        >
          <Text style={styles.buttonText}>Reset to 15min Timeout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  errorBox: {
    backgroundColor: '#fce8e6',
    padding: Spacing.md,
    borderRadius: 8,
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSize.md,
  },
  warningBanner: {
    backgroundColor: '#fef7e0',
    padding: Spacing.md,
    borderRadius: 8,
  },
  warningBannerText: {
    color: Colors.warning,
    fontSize: FontSize.md,
    fontWeight: '600',
    textAlign: 'center',
  },
  statusCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  statusLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusKey: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  statusValue: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
  },
  actions: {
    gap: Spacing.sm,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: Spacing.md,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: Colors.error,
  },
  resetButton: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  configLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  configValue: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
  },
  configButton: {
    backgroundColor: Colors.secondary,
  },
})
