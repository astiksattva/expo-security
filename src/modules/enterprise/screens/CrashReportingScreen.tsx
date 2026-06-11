import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useCrashReporting } from '../hooks/useCrashReporting'

export function CrashReportingScreen() {
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

  if (reports.length === 0 && !error) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Crash Reporting</Text>
        <Text style={styles.description}>
          Capture and report app crashes
        </Text>

        <View style={styles.section}>
          <TouchableOpacity style={styles.button} onPress={initialize}>
            <Text style={styles.buttonText}>Initialize Crash Reporting</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => capture(new Error('Test error'), { source: 'manual_test' })}
          >
            <Text style={styles.buttonText}>Simulate Error</Text>
          </TouchableOpacity>
        </View>

        <EmptyState
          title="No Crashes Captured"
          message="Initialize crash reporting and simulate an error to test"
        />
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Crash Reporting</Text>
      <Text style={styles.description}>
        Capture and report app crashes
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Report Count</Text>
        <Text style={styles.countText}>{reportCount}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.button} onPress={initialize}>
            <Text style={styles.buttonText}>Initialize</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => capture(new Error('Manual test error'))}
          >
            <Text style={styles.buttonText}>Simulate Error</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, isSending && styles.buttonDisabled]}
            onPress={() => {
              if (reports.length > 0) sendReport(reports[reports.length - 1])
            }}
            disabled={isSending}
          >
            <Text style={styles.buttonText}>Send Latest</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={refresh}>
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={clear}>
            <Text style={styles.buttonText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={restore}>
            <Text style={styles.buttonText}>Restore Handler</Text>
          </TouchableOpacity>
        </View>
      </View>

      {error && <ErrorState message={error} />}

      {reports.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stored Reports</Text>
          {reports
            .slice()
            .reverse()
            .map((report) => (
              <View key={report.id} style={styles.reportItem}>
                <Text style={styles.reportError}>{report.error}</Text>
                <Text style={styles.reportTime}>
                  {new Date(report.timestamp).toLocaleString()}
                </Text>
                <Text style={styles.reportStack} numberOfLines={4}>
                  {report.stackTrace}
                </Text>
              </View>
            ))}
        </View>
      ) : (
        <EmptyState
          title="No Crashes Captured"
          message="Simulate an error to test crash reporting"
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
    color: Colors.error,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
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
})
