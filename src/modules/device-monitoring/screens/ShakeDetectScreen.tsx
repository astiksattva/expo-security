import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useShake } from '../hooks/useShake'

export function ShakeDetectScreen() {
  const {
    data,
    error,
    isLoading,
    isAvailable,
    startMonitoring,
    stopMonitoring,
    isMonitoring,
    resetShakeCount,
  } = useShake()

  if (isLoading) {
    return <LoadingState message="Checking accelerometer availability..." />
  }

  if (!isAvailable) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Shake Detection</Text>
        <EmptyState
          title="Not Available"
          message="Accelerometer is not available on this device. Shake detection requires an accelerometer sensor."
        />
      </ScrollView>
    )
  }

  if (error) {
    return <ErrorState message={error} />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Shake Detection</Text>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status</Text>
        <View style={[styles.indicator, data?.isShaking && styles.indicatorActive]} />
        <Text style={styles.statusText}>
          {data?.isShaking ? 'Shaking!' : isMonitoring ? 'Listening...' : 'Idle'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Shake Count</Text>
        <Text style={styles.count}>{data?.shakeCount ?? 0}</Text>
      </View>

      {data?.lastShakeTimestamp && (
        <View style={styles.card}>
          <Text style={styles.label}>Last Shake</Text>
          <Text style={styles.value}>
            {new Date(data.lastShakeTimestamp).toLocaleTimeString()}
          </Text>
        </View>
      )}

      <View style={styles.buttonGroup}>
        {isMonitoring ? (
          <TouchableOpacity style={styles.stopButton} onPress={stopMonitoring}>
            <Text style={styles.buttonText}>Stop Monitoring</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.startButton} onPress={startMonitoring}>
            <Text style={styles.buttonText}>Start Monitoring</Text>
          </TouchableOpacity>
        )}

        {(data?.shakeCount ?? 0) > 0 && (
          <TouchableOpacity style={styles.resetButton} onPress={resetShakeCount}>
            <Text style={styles.resetText}>Reset Count</Text>
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
    marginBottom: Spacing.sm,
  },
  statusContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  statusLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.disabled,
  },
  indicatorActive: {
    backgroundColor: Colors.success,
  },
  statusText: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  count: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  value: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.text,
  },
  buttonGroup: {
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  startButton: {
    backgroundColor: Colors.success,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: Colors.error,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  resetButton: {
    padding: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  resetText: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
    fontWeight: '500',
  },
})
