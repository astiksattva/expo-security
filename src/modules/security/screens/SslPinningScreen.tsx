import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { useSslPinning } from '../hooks/useSslPinning'

export function SslPinningScreen() {
  const {
    config,
    lastResult,
    isSupported,
    isLoading,
    error,
    configure,
    verify,
    addPin,
    removePin,
    clearPins,
  } = useSslPinning()

  const [host, setHost] = useState('')
  const [hash, setHash] = useState('')
  const [pinHost, setPinHost] = useState('')
  const [pinHash, setPinHash] = useState('')

  if (!isSupported) {
    return (
      <ErrorState message="SSL Pinning requires iOS or Android with native prebuild" />
    )
  }

  if (isLoading) {
    return <LoadingState message="Processing SSL pinning..." />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>SSL Pinning</Text>
      <Text style={styles.subtitle}>
        Educational implementation — real SSL pinning requires native modules
      </Text>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {lastResult && (
        <View style={[styles.resultBox, lastResult.isValid ? styles.successBox : styles.failureBox]}>
          <Text style={styles.resultText}>
            {lastResult.isValid ? 'Certificate verified' : 'Pin mismatch'}
          </Text>
          <Text style={styles.resultDetail}>Host: {lastResult.host}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Certificate Pin</Text>
        <TextInput
          style={styles.input}
          placeholder="Host (e.g., api.example.com)"
          placeholderTextColor={Colors.disabled}
          value={pinHost}
          onChangeText={setPinHost}
        />
        <TextInput
          style={styles.input}
          placeholder="SHA-256 Hash"
          placeholderTextColor={Colors.disabled}
          value={pinHash}
          onChangeText={setPinHash}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (pinHost && pinHash) {
              addPin({ host: pinHost, hash: pinHash, algorithm: 'sha256' })
              setPinHost('')
              setPinHash('')
            }
          }}
        >
          <Text style={styles.buttonText}>Add Pin</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Verify Certificate</Text>
        <TextInput
          style={styles.input}
          placeholder="Host"
          placeholderTextColor={Colors.disabled}
          value={host}
          onChangeText={setHost}
        />
        <TextInput
          style={styles.input}
          placeholder="Certificate Hash"
          placeholderTextColor={Colors.disabled}
          value={hash}
          onChangeText={setHash}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (host && hash) {
              verify(host, hash)
            }
          }}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>

      {config && config.pins.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Pins ({config.pins.length})</Text>
          {config.pins.map((pin, index) => (
            <View key={index} style={styles.pinItem}>
              <View style={styles.pinInfo}>
                <Text style={styles.pinHost}>{pin.host}</Text>
                <Text style={styles.pinHash}>{pin.hash.substring(0, 32)}...</Text>
              </View>
              <TouchableOpacity
                onPress={() => removePin(pin.host)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.clearButton} onPress={clearPins}>
            <Text style={styles.clearButtonText}>Clear All Pins</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.noteBox}>
        <Text style={styles.noteText}>
          Note: This is an educational demo. Real SSL pinning requires native
          platform implementation and cannot be achieved purely in JavaScript
          with Expo managed workflow.
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
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  errorBox: {
    backgroundColor: '#fce8e6',
    padding: Spacing.md,
    borderRadius: 8,
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSize.md,
  },
  resultBox: {
    padding: Spacing.md,
    borderRadius: 8,
  },
  successBox: {
    backgroundColor: '#e6f4ea',
  },
  failureBox: {
    backgroundColor: '#fce8e6',
  },
  resultText: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  resultDetail: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
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
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: Spacing.md,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  pinItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pinInfo: {
    flex: 1,
    gap: 2,
  },
  pinHost: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
  },
  pinHash: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  removeText: {
    color: Colors.error,
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  clearButton: {
    alignSelf: 'flex-start',
  },
  clearButtonText: {
    color: Colors.error,
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  noteBox: {
    backgroundColor: '#fef7e0',
    padding: Spacing.md,
    borderRadius: 8,
  },
  noteText: {
    fontSize: FontSize.sm,
    color: '#5f6368',
  },
})
