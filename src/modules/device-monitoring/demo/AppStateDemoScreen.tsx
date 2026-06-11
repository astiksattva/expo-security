import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useAppState } from '../hooks/useAppState'

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const secs = seconds % 60
  if (hours > 0) return `${hours}h ${minutes % 60}m ${secs}s`
  if (minutes > 0) return `${minutes}m ${secs}s`
  return `${secs}s`
}

export function AppStateDemoScreen() {
  const { data, error, isLoading, resetTimers, isForeground } = useAppState()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>App State Monitoring</Text>
        <Text style={styles.subtitle}>Track foreground/background transitions</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>About this feature</Text>
        <Text style={styles.infoText}>
          Uses React Native AppState API to detect when the app moves between
          active, inactive, and background states. Useful for pausing/resuming
          sensitive operations and managing resources.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Demo</Text>

        {isLoading ? (
          <LoadingState message="Starting app state monitor..." />
        ) : error ? (
          <ErrorState message={error} />
        ) : !data ? (
          <EmptyState title="No Data" message="App state unavailable" />
        ) : (
          <View style={styles.demoContainer}>
            <View style={styles.stateIndicator}>
              <View style={[styles.bigDot, isForeground ? styles.activeDot : styles.bgDot]} />
              <Text style={styles.stateText}>{data.state.toUpperCase()}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Previous</Text>
              <Text style={styles.rowValue}>
                {data.previousState ?? 'None'}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Foreground</Text>
              <Text style={styles.rowValue}>{formatTime(data.timeInForeground)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Background</Text>
              <Text style={styles.rowValue}>{formatTime(data.timeInBackground)}</Text>
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetTimers}>
        <Text style={styles.resetText}>Reset Timers</Text>
      </TouchableOpacity>

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
          <Text style={styles.apiName}>AppState.addEventListener()</Text>
          <Text style={styles.apiDesc}>Subscribe to state changes</Text>
        </View>
        <View style={styles.apiRow}>
          <Text style={styles.apiName}>AppState.currentState</Text>
          <Text style={styles.apiDesc}>Read current app state</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Use Cases</Text>
        <Text style={styles.useCaseItem}>
          • Pause/resume network polling when app goes to background
        </Text>
        <Text style={styles.useCaseItem}>
          • Lock sensitive screens when app is backgrounded
        </Text>
        <Text style={styles.useCaseItem}>
          • Save draft state before app is suspended
        </Text>
        <Text style={styles.useCaseItem}>
          • Stop/start location tracking for battery optimization
        </Text>
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
  stateIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  bigDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  activeDot: {
    backgroundColor: Colors.success,
  },
  bgDot: {
    backgroundColor: Colors.textSecondary,
  },
  stateText: {
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
  resetButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '600',
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
  useCaseItem: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    paddingVertical: Spacing.xs,
    lineHeight: 20,
  },
})
