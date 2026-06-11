import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useCrashReporting } from '../hooks/useCrashReporting'

export function CrashReportingDemoScreen() {
  const {
    reports,
    reportCount,
    isSending,
    error,
    initialize,
    capture,
    sendReport,
    clear,
    refresh,
    restore,
  } = useCrashReporting()

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>DEMO</Text>
      </View>

      <Text style={styles.title}>Crash Reporting — Demo</Text>
      <Text style={styles.description}>
        Interactive demo for testing crash capture, storage, and reporting.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Setup</Text>
        <TouchableOpacity style={styles.button} onPress={initialize}>
          <Text style={styles.buttonText}>Initialize Crash Handler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={restore}
        >
          <Text style={styles.buttonText}>Restore Original Handler</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Report Count</Text>
        <Text style={styles.countText}>{reportCount}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Simulate Errors</Text>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => capture(new Error('Runtime error: undefined is not a function'))}
          >
            <Text style={styles.gridButtonText}>Runtime Error</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => capture(new Error('Network request failed'), { url: '/api/data' })}
          >
            <Text style={styles.gridButtonText}>Network Error</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => capture(new Error('Permission denied'), { permission: 'camera' })}
          >
            <Text style={styles.gridButtonText}>Permission Error</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => capture(new Error('Rendering error'), { component: 'NfcView' })}
          >
            <Text style={styles.gridButtonText}>Rendering Error</Text>
          </TouchableOpacity>
        </View>
      </View>

      {reports.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={refresh}>
              <Text style={styles.buttonText}>Refresh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, isSending && styles.buttonDisabled]}
              onPress={() => {
                if (reports.length > 0) sendReport(reports[reports.length - 1])
              }}
              disabled={isSending}
            >
              <Text style={styles.buttonText}>
                {isSending ? 'Sending...' : 'Send Latest'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={clear}>
              <Text style={styles.buttonText}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {error && <ErrorState message={error} />}

      {reports.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Captured Reports ({reports.length})</Text>
          {reports
            .slice()
            .reverse()
            .map((report) => (
              <View key={report.id} style={styles.reportItem}>
                <Text style={styles.reportError}>{report.error}</Text>
                <Text style={styles.reportTime}>
                  {new Date(report.timestamp).toLocaleString()}
                </Text>
                <Text style={styles.reportStack} numberOfLines={3}>
                  {report.stackTrace}
                </Text>
                {report.context && (
                  <View style={styles.contextRow}>
                    {Object.entries(report.context).map(([key, value]) => (
                      <Text key={key} style={styles.contextText}>
                        {key}: {value}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
        </View>
      ) : (
        <EmptyState
          title="No Reports"
          message="Initialize the crash handler and simulate errors using the buttons above"
        />
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Demo Notes</Text>
        <Text style={styles.noteText}>
          • Captures unhandled errors and promise rejections{'\n'}
          • Stores up to 50 reports in memory{'\n'}
          • Reports include stack trace and optional context{'\n'}
          • Restore handler to undo crash reporting setup{'\n'}
          • Works on all platforms including web
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
    color: Colors.error,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  gridButton: {
    backgroundColor: Colors.error,
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
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    minWidth: 100,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  dangerButton: {
    backgroundColor: Colors.error,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  reportItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.xs,
  },
  reportError: {
    fontSize: FontSize.md,
    color: Colors.error,
    fontWeight: '600',
  },
  reportTime: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  reportStack: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontFamily: 'monospace',
  },
  contextRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  contextText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  noteText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
})
