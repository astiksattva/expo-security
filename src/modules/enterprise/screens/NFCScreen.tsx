import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useNFC } from '../hooks/useNFC'

export function NFCScreen() {
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
      <View style={styles.container}>
        <EmptyState
          title="NFC Not Available"
          message="This device does not support NFC or NFC is disabled"
        />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>NFC</Text>
      <Text style={styles.description}>
        Read NFC tags using expo-nfc
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status</Text>
        <View style={styles.statusRow}>
          <Text style={styles.labelText}>Available:</Text>
          <Text style={[styles.statusValue, isAvailable && styles.statusYes]}>
            {isAvailable ? 'Yes' : 'No'}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.labelText}>Polling:</Text>
          <Text style={[styles.statusValue, isPolling && styles.statusActive]}>
            {isPolling ? 'Active' : 'Inactive'}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        {isPolling ? (
          <TouchableOpacity style={styles.button} onPress={stopPolling}>
            <Text style={styles.buttonText}>Stop Polling</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={startPolling}>
            <Text style={styles.buttonText}>Start Polling</Text>
          </TouchableOpacity>
        )}
      </View>

      {lastTag && (
        <View style={styles.section}>
          <View style={styles.tagHeader}>
            <Text style={styles.sectionTitle}>Last Tag Read</Text>
            <TouchableOpacity onPress={clearTag}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.valueText}>ID: {lastTag.id}</Text>
          {lastTag.records.map((record, index) => (
            <View key={index} style={styles.recordItem}>
              <Text style={styles.labelText}>Record {index + 1}:</Text>
              <Text style={styles.monoText}>Type: {record.type}</Text>
              <Text style={styles.monoText}>Payload: {record.payload}</Text>
            </View>
          ))}
        </View>
      )}

      {!lastTag && !isPolling && !isLoading && !error && (
        <EmptyState
          title="No NFC Tags"
          message='Tap "Start Polling" and hold an NFC tag near the device'
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
  actions: {
    gap: Spacing.sm,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
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
  },
})
