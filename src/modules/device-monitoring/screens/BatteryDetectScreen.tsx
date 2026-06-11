import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useBattery } from '../hooks/useBattery'

function formatPercentage(level: number): string {
  return `${Math.round(level * 100)}%`
}

function getStateColor(state: string): string {
  switch (state) {
    case 'charging':
      return Colors.success
    case 'full':
      return Colors.primary
    case 'unplugged':
      return Colors.warning
    default:
      return Colors.textSecondary
  }
}

export function BatteryDetectScreen() {
  const { data, error, isLoading, refetch } = useBattery()

  if (isLoading) {
    return <LoadingState message="Reading battery status..." />
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />
  }

  if (!data) {
    return <EmptyState title="No Battery Data" message="Unable to retrieve battery information" />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Battery Detection</Text>

      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>{formatPercentage(data.level)}</Text>
        <View style={styles.barOuter}>
          <View style={[styles.barInner, { width: `${data.level * 100}%` as any }]} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Charge State</Text>
        <Text style={[styles.value, { color: getStateColor(data.state) }]}>
          {data.state.charAt(0).toUpperCase() + data.state.slice(1)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Charging</Text>
        <Text style={[styles.value, data.isCharging ? styles.active : styles.inactive]}>
          {data.isCharging ? 'Yes' : 'No'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Low Power Mode</Text>
        <Text style={[styles.value, data.lowPowerMode ? styles.warning : styles.inactive]}>
          {data.lowPowerMode ? 'Enabled' : 'Disabled'}
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
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  levelContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    gap: Spacing.md,
  },
  levelText: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  barOuter: {
    width: '100%',
    height: 24,
    backgroundColor: Colors.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  barInner: {
    height: '100%',
    backgroundColor: Colors.success,
    borderRadius: 12,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.text,
  },
  active: {
    color: Colors.success,
  },
  inactive: {
    color: Colors.textSecondary,
  },
  warning: {
    color: Colors.warning,
  },
})
