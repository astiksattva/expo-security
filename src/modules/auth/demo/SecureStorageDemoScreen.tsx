import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { useAppStore } from '../../../store/appStore'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useSecureStorage } from '../hooks/useSecureStorage'
import { isWeb } from '../../../utils/platform'

export function SecureStorageDemoScreen() {
  const isDemoMode = useAppStore((s) => s.isDemoMode)
  const { entries, isLoading, error, result, saveItem, readItem, deleteItem, clearItems } =
    useSecureStorage()

  const [keyInput, setKeyInput] = useState('')
  const [valueInput, setValueInput] = useState('')
  const [readKeyInput, setReadKeyInput] = useState('')

  if (!isDemoMode) {
    useAppStore.getState().setDemoMode(true)
  }

  if (isWeb) {
    return (
      <EmptyState
        title="Not Supported"
        message="Secure Storage is not available on web platforms."
      />
    )
  }

  if (error && !result) {
    return <ErrorState message={error} />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Storage Demo</Text>
      <Text style={styles.subtitle}>Test secure key-value storage in demo mode</Text>

      <View style={styles.demoInfo}>
        <Text style={styles.demoInfoText}>
          In demo mode, items are stored in memory. In production, data is
          encrypted using the platform keychain / keystore.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Write Item</Text>
        <TextInput
          style={styles.input}
          placeholder="Key"
          placeholderTextColor={Colors.disabled}
          value={keyInput}
          onChangeText={setKeyInput}
        />
        <TextInput
          style={styles.input}
          placeholder="Value"
          placeholderTextColor={Colors.disabled}
          value={valueInput}
          onChangeText={setValueInput}
        />
        <TouchableOpacity
          style={[styles.button, (!keyInput || !valueInput || isLoading) && styles.buttonDisabled]}
          onPress={() => saveItem(keyInput, valueInput)}
          disabled={!keyInput || !valueInput || isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Saving...' : 'Save to Secure Storage'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Read Item</Text>
        <TextInput
          style={styles.input}
          placeholder="Key to read"
          placeholderTextColor={Colors.disabled}
          value={readKeyInput}
          onChangeText={setReadKeyInput}
        />
        <TouchableOpacity
          style={[styles.button, (!readKeyInput || isLoading) && styles.buttonDisabled]}
          onPress={() => readItem(readKeyInput)}
          disabled={!readKeyInput || isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Reading...' : 'Read from Secure Storage'}
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading && <LoadingState message="Processing secure storage operation..." />}

      {result && !result.success && result.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{result.error}</Text>
        </View>
      )}

      {entries.length > 0 && (
        <View style={styles.entriesSection}>
          <Text style={styles.sectionTitle}>Stored Items ({entries.length})</Text>
          <FlatList
            data={entries}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View style={styles.entry}>
                <View style={styles.entryInfo}>
                  <Text style={styles.entryKey}>{item.key}</Text>
                  <Text style={styles.entryValue} numberOfLines={1}>
                    {item.value}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteItem(item.key)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            style={styles.entryList}
          />
          <TouchableOpacity style={styles.clearButton} onPress={clearItems}>
            <Text style={styles.clearText}>Clear All Items</Text>
          </TouchableOpacity>
        </View>
      )}

      {entries.length === 0 && !isLoading && (
        <EmptyState
          title="No Items"
          message="Add items using the form above to test secure storage."
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  demoInfo: {
    backgroundColor: Colors.warning + '20',
    borderRadius: 10,
    padding: Spacing.md,
  },
  demoInfoText: {
    fontSize: FontSize.sm,
    color: Colors.text,
    lineHeight: 20,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: Colors.error + '20',
    borderRadius: 10,
    padding: Spacing.md,
    alignItems: 'center',
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSize.md,
    textAlign: 'center',
  },
  entriesSection: {
    gap: Spacing.sm,
  },
  entryList: {
    maxHeight: 200,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xs,
  },
  entryInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  entryKey: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  entryValue: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  deleteButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  deleteText: {
    color: Colors.error,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  clearButton: {
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  clearText: {
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },
})
