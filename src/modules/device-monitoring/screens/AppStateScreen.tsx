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

function getStateColor(state: string): string {
  switch (state) {
    case 'active':
      return Colors.success
    case 'inactive':
      return Colors.warning
    case 'background':
      return Colors.textSecondary
    default:
      return Colors.disabled
  }
}

export function AppStateScreen() {
  const { data, error, isLoading, resetTimers, isForeground } = useAppState()

  if (isLoading) {
    return <LoadingState message="Initializing app state monitor..." />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  if (!data) {
    return <EmptyState title="No App State Data" message="Unable to retrieve app state information" />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>App State Monitoring</Text>

      <View style={styles.stateContainer}>
        <View style={[styles.dot, { backgroundColor: getStateColor(data.state) }]} />
        <Text style={[styles.stateText, { color: getStateColor(data.state) }]}>
          {data.state.charAt(0).toUpperCase() + data.state.slice(1)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Previous State</Text>
        <Text style={styles.value}>
          {data.previousState
            ? data.previousState.charAt(0).toUpperCase() + data.previousState.slice(1)
            : 'None'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Time in Foreground</Text>
        <Text style={styles.value}>{formatTime(data.timeInForeground)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Time in Background</Text>
        <Text style={styles.value}>{formatTime(data.timeInBackground)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Currently in Foreground</Text>
        <Text style={[styles.value, isForeground ? styles.active : styles.inactive]}>
          {isForeground ? 'Yes' : 'No'}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={resetTimers}>
        <Text style={styles.buttonText}>Reset Timers</Text>
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
  title: {
    fontSize: FontSize.title,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  stateContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  stateText: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
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
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
})
