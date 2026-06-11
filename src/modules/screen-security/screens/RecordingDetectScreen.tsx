import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { useRecordingDetect } from '../hooks/useRecordingDetect'
import { LoadingState } from '../../../components/LoadingState'
import { ErrorState } from '../../../components/ErrorState'
import { EmptyState } from '../../../components/EmptyState'

export function RecordingDetectScreen() {
  const {
    state,
    error,
    loading,
    refresh,
    pollingActive,
    startPolling,
    stopPolling,
  } = useRecordingDetect()

  if (loading && !pollingActive) {
    return <LoadingState message="Checking recording status..." />
  }

  if (error) {
    return <ErrorState message={error} onRetry={refresh} />
  }

  if (!state.available) {
    return (
      <EmptyState
        title="Recording detection unavailable"
        message="Screen recording detection is only supported on iOS devices. On Android, use screenshot prevention as an alternative."
      />
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Recording Detection</Text>
      <Text style={styles.description}>
        Detects when the screen is being recorded. Polls device status at a
        regular interval.
      </Text>

      <View style={styles.statusCard}>
        <View
          style={[
            styles.indicator,
            { backgroundColor: state.isRecording ? Colors.error : Colors.success },
          ]}
        />
        <View style={styles.statusInfo}>
          <Text style={styles.statusLabel}>Status</Text>
          <Text
            style={[
              styles.statusValue,
              { color: state.isRecording ? Colors.error : Colors.success },
            ]}
          >
            {state.isRecording ? 'Recording Detected' : 'No Recording'}
          </Text>
        </View>
      </View>

      <View style={styles.pollCard}>
        <Text style={styles.pollLabel}>Polling</Text>
        <View
          style={[
            styles.pollIndicator,
            { backgroundColor: pollingActive ? Colors.primary : Colors.disabled },
          ]}
        />
        <Text style={styles.pollText}>
          {pollingActive ? 'Active (2s interval)' : 'Inactive'}
        </Text>
      </View>

      {!pollingActive && (
        <EmptyState
          title="Monitoring inactive"
          message="Start polling to continuously check recording status"
        />
      )}

      <View style={styles.controls}>
        {!pollingActive ? (
          <TouchableOpacity style={styles.primaryButton} onPress={startPolling}>
            <Text style={styles.buttonText}>Start Monitoring</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.dangerButton} onPress={stopPolling}>
            <Text style={styles.buttonText}>Stop Monitoring</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.secondaryButton, pollingActive && styles.disabledButton]}
          onPress={refresh}
          disabled={pollingActive}
        >
          <Text style={styles.secondaryButtonText}>Check Now</Text>
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
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
    color: Colors.text,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  statusCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  indicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  statusValue: {
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  pollCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  pollLabel: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '500',
  },
  pollIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pollText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginLeft: 'auto',
  },
  controls: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: Colors.error,
    borderRadius: 10,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  secondaryButton: {
    borderRadius: 10,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
})
