import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useAnalytics } from '../hooks/useAnalytics'

export function AnalyticsScreen() {
  const {
    events,
    eventCount,
    isFlushing,
    error,
    track,
    trackScreenView,
    trackUserAction,
    flush,
    clear,
  } = useAnalytics()

  if (isFlushing && events.length === 0) {
    return <LoadingState message="Initializing analytics..." />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Analytics</Text>
      <Text style={styles.description}>
        Track user events and app usage
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Event Count</Text>
        <Text style={styles.countText}>{eventCount}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Track Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => track('button_click', { button: 'test' })}
          >
            <Text style={styles.actionButtonText}>Track Event</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => trackScreenView('AnalyticsScreen')}
          >
            <Text style={styles.actionButtonText}>Screen View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => trackUserAction('login', { method: 'test' })}
          >
            <Text style={styles.actionButtonText}>User Action</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.button, isFlushing && styles.buttonDisabled]}
            onPress={flush}
            disabled={isFlushing}
          >
            <Text style={styles.buttonText}>
              {isFlushing ? 'Flushing...' : 'Flush Events'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.dangerButton]}
            onPress={clear}
          >
            <Text style={styles.buttonText}>Clear Events</Text>
          </TouchableOpacity>
        </View>
      </View>

      {error && <ErrorState message={error} onRetry={flush} />}

      {events.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Events ({events.length})</Text>
          {events
            .slice()
            .reverse()
            .slice(0, 20)
            .map((event, index) => (
              <View key={index} style={styles.eventItem}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventTime}>
                  {new Date(event.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            ))}
        </View>
      ) : (
        <EmptyState
          title="No Events Tracked"
          message="Use the action buttons above to track events"
        />
      )}
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
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 20,
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
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  countText: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.primary,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
  },
  actionButtonText: {
    color: Colors.surface,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  dangerButton: {
    backgroundColor: Colors.error,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  eventName: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '500',
    flex: 1,
  },
  eventTime: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
})
