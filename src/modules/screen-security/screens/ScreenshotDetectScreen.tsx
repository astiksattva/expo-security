import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { useScreenshotDetect } from '../hooks/useScreenshotDetect'
import { LoadingState } from '../../../components/LoadingState'
import { ErrorState } from '../../../components/ErrorState'
import { EmptyState } from '../../../components/EmptyState'

export function ScreenshotDetectScreen() {
  const { state, error, loading, reset, startListening, stopListening } =
    useScreenshotDetect()

  if (loading) {
    return <LoadingState message="Initializing screenshot detection..." />
  }

  if (error) {
    return <ErrorState message={error} onRetry={startListening} />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Screenshot Detection</Text>
      <Text style={styles.description}>
        Detects when a screenshot is taken on the device and logs the event with
        a timestamp.
      </Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Status</Text>
        <Text style={styles.statusValue}>
          {state.listenerActive ? 'Listening' : 'Inactive'}
        </Text>
        <View
          style={[
            styles.indicator,
            { backgroundColor: state.listenerActive ? Colors.success : Colors.disabled },
          ]}
        />
      </View>

      {state.detected && (
        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Screenshot Captured</Text>
          <Text style={styles.eventTime}>
            {state.timestamp
              ? new Date(state.timestamp).toLocaleTimeString()
              : 'N/A'}
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={reset}>
            <Text style={styles.resetButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      {!state.detected && state.listenerActive && (
        <EmptyState
          title="No screenshots detected"
          message="Take a screenshot on your device to trigger detection"
        />
      )}

      {!state.listenerActive && (
        <EmptyState
          title="Listener Inactive"
          message="Tap 'Start Listening' to begin monitoring for screenshots"
        />
      )}

      <View style={styles.controls}>
        {!state.listenerActive ? (
          <TouchableOpacity style={styles.primaryButton} onPress={startListening}>
            <Text style={styles.buttonText}>Start Listening</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.dangerButton} onPress={stopListening}>
            <Text style={styles.buttonText}>Stop Listening</Text>
          </TouchableOpacity>
        )}
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
    gap: Spacing.sm,
  },
  statusLabel: {
    fontSize: FontSize.lg,
    color: Colors.text,
    fontWeight: '600',
  },
  statusValue: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
    marginLeft: 'auto',
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  eventCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.warning,
    gap: Spacing.sm,
  },
  eventTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.warning,
  },
  eventTime: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  resetButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 6,
    backgroundColor: Colors.background,
  },
  resetButtonText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
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
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
})
