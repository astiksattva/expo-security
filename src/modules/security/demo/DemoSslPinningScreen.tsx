import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { LoadingState } from '../../../components/LoadingState'

interface DemoPin {
  host: string
  hash: string
}

interface DemoResult {
  host: string
  matched: boolean
  message: string
}

export function DemoSslPinningScreen() {
  const [pins, setPins] = useState<DemoPin[]>([
    { host: 'api.example.com', hash: 'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890' },
  ])
  const [host, setHost] = useState('')
  const [hash, setHash] = useState('')
  const [verifyHost, setVerifyHost] = useState('')
  const [verifyHash, setVerifyHash] = useState('')
  const [result, setResult] = useState<DemoResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddPin = () => {
    if (!host || !hash) return
    setPins((prev) => [...prev, { host, hash }])
    setHost('')
    setHash('')
  }

  const handleRemovePin = (index: number) => {
    setPins((prev) => prev.filter((_, i) => i !== index))
  }

  const handleVerify = () => {
    setIsLoading(true)
    setTimeout(() => {
      const matched = pins.some((p) => p.host === verifyHost && p.hash === verifyHash)
      setResult({
        host: verifyHost,
        matched,
        message: matched
          ? 'Certificate pin matched!'
          : 'Pin mismatch — possible MITM attack!',
      })
      setIsLoading(false)
    }, 500)
  }

  if (isLoading) {
    return <LoadingState message="Verifying certificate pin..." />
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>SSL Pinning (Demo)</Text>
      <Text style={styles.subtitle}>Simulated certificate pinning — no native modules required</Text>

      {result && (
        <View style={[styles.resultBox, result.matched ? styles.successBox : styles.failureBox]}>
          <Text style={styles.resultText}>{result.message}</Text>
          <Text style={styles.resultDetail}>Host: {result.host}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Pin (Demo)</Text>
        <TextInput style={styles.input} placeholder="Host" placeholderTextColor={Colors.disabled} value={host} onChangeText={setHost} />
        <TextInput style={styles.input} placeholder="SHA-256 Hash" placeholderTextColor={Colors.disabled} value={hash} onChangeText={setHash} />
        <TouchableOpacity style={styles.button} onPress={handleAddPin}><Text style={styles.buttonText}>Add Pin</Text></TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Verify (Demo)</Text>
        <TextInput style={styles.input} placeholder="Host" placeholderTextColor={Colors.disabled} value={verifyHost} onChangeText={setVerifyHost} />
        <TextInput style={styles.input} placeholder="Certificate Hash" placeholderTextColor={Colors.disabled} value={verifyHash} onChangeText={setVerifyHash} />
        <TouchableOpacity style={styles.button} onPress={handleVerify}><Text style={styles.buttonText}>Verify</Text></TouchableOpacity>
      </View>

      {pins.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Pins ({pins.length})</Text>
          {pins.map((pin, i) => (
            <View key={i} style={styles.pinItem}>
              <Text style={styles.pinHost}>{pin.host}</Text>
              <Text style={styles.pinHash}>{pin.hash.substring(0, 24)}...</Text>
              <TouchableOpacity onPress={() => handleRemovePin(i)}><Text style={styles.removeText}>Remove</Text></TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.md },
  title: { fontSize: FontSize.xxl, fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary },
  resultBox: { padding: Spacing.md, borderRadius: 8 },
  successBox: { backgroundColor: '#e6f4ea' },
  failureBox: { backgroundColor: '#fce8e6' },
  resultText: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.text },
  resultDetail: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  section: { backgroundColor: Colors.surface, borderRadius: 12, padding: Spacing.md, borderWidth: 1, borderColor: Colors.border, gap: Spacing.sm },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.text },
  input: { backgroundColor: Colors.background, borderRadius: 8, padding: Spacing.md, fontSize: FontSize.md, color: Colors.text, borderWidth: 1, borderColor: Colors.border },
  button: { backgroundColor: Colors.primary, borderRadius: 8, padding: Spacing.md, alignItems: 'center' },
  buttonText: { color: Colors.surface, fontSize: FontSize.md, fontWeight: '600' },
  pinItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.border },
  pinHost: { fontSize: FontSize.md, fontWeight: '500', color: Colors.text },
  pinHash: { fontSize: FontSize.sm, color: Colors.textSecondary, flex: 1, marginHorizontal: Spacing.sm },
  removeText: { color: Colors.error, fontSize: FontSize.sm, fontWeight: '500' },
})
