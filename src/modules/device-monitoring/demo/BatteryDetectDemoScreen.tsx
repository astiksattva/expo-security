import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useBattery } from '../hooks/useBattery'

export function BatteryDetectDemoScreen() {
  const { data, error, isLoading, refetch } = useBattery()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Battery Detection</Text>
        <Text style={styles.subtitle}>Monitor battery level, charging status, and power mode</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>About this feature</Text>
        <Text style={styles.infoText}>
          Uses expo-battery to read battery level, detect charging state, monitor
          low power mode, and subscribe to real-time battery changes.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Demo</Text>
        {isLoading ? (
          <LoadingState message="Reading battery..." />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : !data ? (
          <EmptyState title="No Data" message="Battery information unavailable" />
        ) : (
          <View style={styles.demoContainer}>
            <View style={styles.levelRow}>
              <Text style={styles.levelLabel}>Battery</Text>
              <Text style={styles.levelValue}>{Math.round(data.level * 100)}%</Text>
            </View>
            <View style={styles.barOuter}>
              <View style={[styles.barInner, { width: `${Math.round(data.level * 100)}%` }]} />
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>State</Text>
              <Text style={styles.rowValue}>{data.state}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Charging</Text>
              <Text style={[styles.rowValue, data.isCharging ? styles.success : styles.neutral]}>
                {data.isCharging ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Low Power Mode</Text>
              <Text style={[styles.rowValue, data.lowPowerMode ? styles.warning : styles.neutral]}>
                {data.lowPowerMode ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
          </View>
        )}
      </View>

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
          <Text style={styles.supportValue}>❌ Not Supported</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key APIs Used</Text>
        <View style={styles.apiRow}>
          <Text style={styles.apiName}>getBatteryLevelAsync()</Text>
          <Text style={styles.apiDesc}>Returns battery level (0-1)</Text>
        </View>
        <View style={styles.apiRow}>
          <Text style={styles.apiName}>getBatteryStateAsync()</Text>
          <Text style={styles.apiDesc}>Returns charging/full/unplugged</Text>
        </View>
        <View style={styles.apiRow}>
          <Text style={styles.apiName}>isLowPowerModeEnabledAsync()</Text>
          <Text style={styles.apiDesc}>Check low power mode (iOS)</Text>
        </View>
        <View style={styles.apiRow}>
          <Text style={styles.apiName}>addBatteryLevelListener()</Text>
          <Text style={styles.apiDesc}>Subscribe to level changes</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={refetch}>
        <Text style={styles.refreshText}>Refresh Battery Status</Text>
      </TouchableOpacity>
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
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  levelValue: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  barOuter: {
    width: '100%',
    height: 20,
    backgroundColor: Colors.border,
    borderRadius: 10,
    overflow: 'hidden',
  },
  barInner: {
    height: '100%',
    backgroundColor: Colors.success,
    borderRadius: 10,
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
  success: {
    color: Colors.success,
  },
  warning: {
    color: Colors.warning,
  },
  neutral: {
    color: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
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
  refreshButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  refreshText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
})
