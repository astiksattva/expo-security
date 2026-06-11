import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useShake } from '../hooks/useShake'

export function ShakeDetectDemoScreen() {
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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Shake Detection</Text>
        <Text style={styles.subtitle}>Detect device shake using accelerometer</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>About this feature</Text>
        <Text style={styles.infoText}>
          Uses expo-sensors Accelerometer to monitor device acceleration and
          detect shake gestures with configurable sensitivity and cooldown.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Demo</Text>

        {isLoading ? (
          <LoadingState message="Checking accelerometer..." />
        ) : error ? (
          <ErrorState message={error} />
        ) : !isAvailable ? (
          <EmptyState
            title="Not Available"
            message="Accelerometer required for shake detection"
          />
        ) : (
          <View style={styles.demoContainer}>
            <View style={styles.statusRow}>
              <View style={[styles.dot, data?.isShaking && styles.dotActive]} />
              <Text style={styles.statusText}>
                {data?.isShaking ? 'SHAKE DETECTED!' : isMonitoring ? 'Listening...' : 'Stopped'}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.countRow}>
              <Text style={styles.countLabel}>Shake Count</Text>
              <Text style={styles.countValue}>{data?.shakeCount ?? 0}</Text>
            </View>
            {data?.lastShakeTimestamp && (
              <>
                <View style={styles.divider} />
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Last Shake</Text>
                  <Text style={styles.rowValue}>
                    {new Date(data.lastShakeTimestamp).toLocaleTimeString()}
                  </Text>
                </View>
              </>
            )}
          </View>
        )}
      </View>

      {isAvailable && (
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
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Support</Text>
        <View style={styles.supportRow}>
          <Text style={styles.supportLabel}>Expo Go</Text>
          <Text style={styles.supportValue}>✅ Full</Text>
        </View>
        <View style={styles.supportRow}>
          <Text style={styles.supportLabel}>Dev Build</Text>
          <Text style={styles.supportValue}>✅ Full</Text>
        </View>
        <View style={styles.supportRow}>
          <Text style={styles.supportLabel}>EAS Build</Text>
          <Text style={styles.supportValue}>✅ Full</Text>
        </View>
        <View style={styles.supportRow}>
          <Text style={styles.supportLabel}>Android</Text>
          <Text style={styles.supportValue}>✅ Full</Text>
        </View>
        <View style={styles.supportRow}>
          <Text style={styles.supportLabel}>iOS</Text>
          <Text style={styles.supportValue}>✅ Full</Text>
        </View>
        <View style={styles.supportRow}>
          <Text style={styles.supportLabel}>Web</Text>
          <Text style={styles.supportValue}>⚠️ Limited</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key APIs Used</Text>
        <View style={styles.apiRow}>
          <Text style={styles.apiName}>Accelerometer.addListener()</Text>
          <Text style={styles.apiDesc}>Subscribe to acceleration data</Text>
        </View>
        <View style={styles.apiRow}>
          <Text style={styles.apiName}>Accelerometer.setUpdateInterval()</Text>
          <Text style={styles.apiDesc}>Set data sampling rate (ms)</Text>
        </View>
        <View style={styles.apiRow}>
          <Text style={styles.apiName}>Accelerometer.isAvailableAsync()</Text>
          <Text style={styles.apiDesc}>Check hardware availability</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration</Text>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Threshold</Text>
          <Text style={styles.configValue}>1.5 (default)</Text>
        </View>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Interval</Text>
          <Text style={styles.configValue}>100ms (default)</Text>
        </View>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Cooldown</Text>
          <Text style={styles.configValue}>500ms (default)</Text>
        </View>
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
  header: {
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  infoBox: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  infoText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  demoContainer: {
    gap: Spacing.sm,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.disabled,
  },
  dotActive: {
    backgroundColor: Colors.success,
  },
  statusText: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  countValue: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  rowValue: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  buttonGroup: {
    gap: Spacing.sm,
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
  supportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  supportLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  supportValue: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
  },
  apiRow: {
    paddingVertical: Spacing.xs,
  },
  apiName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    fontFamily: 'monospace',
  },
  apiDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  configLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    fontFamily: 'monospace',
  },
  configValue: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
  },
})
