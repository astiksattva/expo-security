import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { useCastingDetect } from '../hooks/useCastingDetect'
import { LoadingState } from '../../../components/LoadingState'
import { ErrorState } from '../../../components/ErrorState'
import { EmptyState } from '../../../components/EmptyState'

export function CastingDetectScreen() {
  const {
    state,
    error,
    loading,
    refresh,
    pollingActive,
    startPolling,
    stopPolling,
    details,
  } = useCastingDetect()

  if (loading && !pollingActive) {
    return <LoadingState message="Checking casting status..." />
  }

  if (error) {
    return <ErrorState message={error} onRetry={refresh} />
  }

  if (!state.available) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Casting Detection</Text>
        <Text style={styles.description}>
          Detects when the device screen is being cast or mirrored to an external
          display.
        </Text>
        <EmptyState
          title="Not yet supported"
          message="Screen casting detection requires a native module. On iOS, UIScreen.isCaptured can detect mirroring. On Android, DisplayManager or MediaRouter listeners are needed. This requires a custom native module or third-party library."
        />
        {details && (
          <View style={styles.detailCard}>
            <Text style={styles.detailText}>{details}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.primaryButton} onPress={refresh}>
          <Text style={styles.buttonText}>Check Status</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Casting Detection</Text>
      <Text style={styles.description}>
        Monitors whether the screen is being cast or mirrored to an external
        display.
      </Text>

      <View style={styles.statusCard}>
        <View
          style={[
            styles.indicator,
            { backgroundColor: state.isCasting ? Colors.error : Colors.success },
          ]}
        />
        <View style={styles.statusInfo}>
          <Text style={styles.statusLabel}>Casting Status</Text>
          <Text
            style={[
              styles.statusValue,
              { color: state.isCasting ? Colors.error : Colors.success },
            ]}
          >
            {state.isCasting ? 'Casting Detected' : 'No Casting'}
          </Text>
        </View>
      </View>

      {details && (
        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>Details</Text>
          <Text style={styles.detailText}>{details}</Text>
        </View>
      )}

      <View style={styles.pollCard}>
        <Text style={styles.pollLabel}>Polling</Text>
        <View
          style={[
            styles.pollIndicator,
            { backgroundColor: pollingActive ? Colors.primary : Colors.disabled },
          ]}
        />
        <Text style={styles.pollText}>
          {pollingActive ? 'Active (3s interval)' : 'Inactive'}
        </Text>
      </View>

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
  detailCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.xs,
  },
  detailLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  detailText: {
    fontSize: FontSize.md,
    color: Colors.text,
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
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
})
