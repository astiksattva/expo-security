import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useNFC } from '../hooks/useNFC'

export function NFCDemoScreen() {
  const {
    isAvailable,
    isPolling,
    lastTag,
    isLoading,
    error,
    startPolling,
    stopPolling,
    clearTag,
  } = useNFC()

  if (isLoading && isAvailable === null) {
    return <LoadingState message="Checking NFC availability..." />
  }

  if (error && isAvailable === false) {
    return <ErrorState message={error} onRetry={startPolling} />
  }

  if (isAvailable === false) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <EmptyState
          title="NFC Not Available"
          message="This device does not support NFC. NFC requires a physical device with NFC hardware."
        />
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>DEMO</Text>
      </View>

      <Text style={styles.title}>NFC — Demo</Text>
      <Text style={styles.description}>
        Interactive demo for reading NFC tags using expo-nfc.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NFC Status</Text>
        <View style={styles.statusRow}>
          <Text style={styles.labelText}>Hardware:</Text>
          <Text style={[styles.statusValue, isAvailable && styles.statusYes]}>
            {isAvailable ? 'Available' : 'Unavailable'}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.labelText}>Polling:</Text>
          <Text style={[styles.statusValue, isPolling && styles.statusActive]}>
            {isPolling ? 'Active — scanning for tags' : 'Inactive'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Controls</Text>
        <View style={styles.buttonRow}>
          {isPolling ? (
            <TouchableOpacity style={styles.stopButton} onPress={stopPolling}>
              <Text style={styles.buttonText}>Stop Polling</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.startButton} onPress={startPolling}>
              <Text style={styles.buttonText}>Start Polling</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {lastTag && (
        <View style={styles.section}>
          <View style={styles.tagHeader}>
            <Text style={styles.sectionTitle}>Tag Data</Text>
            <TouchableOpacity onPress={clearTag}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.valueText}>ID: {lastTag.id}</Text>
          {lastTag.records.map((record, index) => (
            <View key={index} style={styles.recordItem}>
              <Text style={styles.recordTitle}>Record {index + 1}</Text>
              <Text style={styles.monoText}>Type: {record.type}</Text>
              <Text style={styles.monoText}>Tech: {record.techTypes.join(', ')}</Text>
              <Text style={styles.monoText}>Payload: {record.payload}</Text>
            </View>
          ))}
        </View>
      )}

      {!lastTag && !isPolling && !isLoading && !error && (
        <EmptyState
          title="No Tag Detected"
          message='Tap "Start Polling" and hold an NFC tag to the back of your device'
        />
      )}

      {isPolling && !lastTag && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Listening for Tags</Text>
          <Text style={styles.noteText}>
            Hold an NFC tag near the back of your device...
          </Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Demo Notes</Text>
        <Text style={styles.noteText}>
          • Requires a physical device with NFC hardware{'\n'}
          • Not available on iOS simulator or Android emulator{'\n'}
          • iOS: NFC tag reading requires iOS 13+{'\n'}
          • Android: NFC requires Android 4.4+{'\n'}
          • expo-nfc is a dev build module, not available in Expo Go
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
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusValue: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  statusYes: {
    color: Colors.success,
  },
  statusActive: {
    color: Colors.primary,
  },
  valueText: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '500',
  },
  labelText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  monoText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontFamily: 'monospace',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  startButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  stopButton: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  tagHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearText: {
    fontSize: FontSize.sm,
    color: Colors.error,
    fontWeight: '500',
  },
  recordItem: {
    gap: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  recordTitle: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  noteText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
})
