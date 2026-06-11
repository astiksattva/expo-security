import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useAnalytics } from '../hooks/useAnalytics'

export function AnalyticsDemoScreen() {
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
    return <LoadingState message="Initializing analytics demo..." />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>DEMO</Text>
      </View>

      <Text style={styles.title}>Analytics — Demo</Text>
      <Text style={styles.description}>
        Interactive demo for testing event tracking, buffering, and flushing.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Event Counter</Text>
        <Text style={styles.countText}>{eventCount}</Text>
        <Text style={styles.labelText}>events buffered in memory</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => track('demo_click', { source: 'demo_screen' })}
          >
            <Text style={styles.gridButtonText}>Track Click</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => trackScreenView('AnalyticsDemoScreen')}
          >
            <Text style={styles.gridButtonText}>Screen View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => trackUserAction('demo_signup', { method: 'demo' })}
          >
            <Text style={styles.gridButtonText}>User Action</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => track('demo_error', { code: 'test_error' })}
          >
            <Text style={styles.gridButtonText}>Error Event</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bulk Actions</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              for (let i = 0; i < 5; i++) {
                track(`bulk_event_${i + 1}`, { batch: 'demo' })
              }
            }}
          >
            <Text style={styles.buttonText}>Add 5 Events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.flushButton]}
            onPress={flush}
            disabled={isFlushing}
          >
            <Text style={styles.buttonText}>
              {isFlushing ? 'Flushing...' : 'Flush to Server'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {error && <ErrorState message={error} onRetry={flush} />}

      {events.length > 0 ? (
        <View style={styles.section}>
          <View style={styles.eventHeader}>
            <Text style={styles.sectionTitle}>Event Log ({events.length})</Text>
            <TouchableOpacity onPress={clear}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          {events
            .slice()
            .reverse()
            .slice(0, 15)
            .map((event, index) => (
              <View key={index} style={styles.eventItem}>
                <View style={styles.eventDot} />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <Text style={styles.eventTime}>
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              </View>
            ))}
          {events.length > 15 && (
            <Text style={styles.moreText}>
              ... and {events.length - 15} more events
            </Text>
          )}
        </View>
      ) : (
        <EmptyState
          title="No Events Yet"
          message="Use the action buttons above to track analytics events"
        />
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Demo Notes</Text>
        <Text style={styles.noteText}>
          • Events are stored in memory buffer (max 1000){'\n'}
          • Flush sends events to the configured endpoint{'\n'}
          • Failed flushes are re-queued with existing events{'\n'}
          • Analytics works on all platforms including web
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
    padding: Spacing.md,
    gap: Spacing.md,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.warning,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.surface,
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
  labelText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  gridButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    flex: 1,
    minWidth: 100,
    alignItems: 'center',
  },
  gridButtonText: {
    color: Colors.surface,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  flushButton: {
    backgroundColor: Colors.success,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearText: {
    fontSize: FontSize.sm,
    color: Colors.error,
    fontWeight: '500',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  eventInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventName: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '500',
  },
  eventTime: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  moreText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingTop: Spacing.xs,
  },
  noteText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
})
