import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { LoadingState } from '../../../components/LoadingState'

export function DemoForceUpdateScreen() {
  const [currentVersion, setCurrentVersion] = useState('1.0.0')
  const [latestVersion, setLatestVersion] = useState('1.0.0')
  const [minVersion, setMinVersion] = useState('1.0.0')
  const [isLoading, setIsLoading] = useState(false)

  const parseVersion = (v: string) => v.split('.').map(Number)
  const compare = (a: string, b: string) => {
    const [a1, a2, a3] = parseVersion(a)
    const [b1, b2, b3] = parseVersion(b)
    if (a1 !== b1) return a1 - b1
    if (a2 !== b2) return a2 - b2
    return a3 - b3
  }

  const needsUpdate = compare(currentVersion, minVersion) < 0
  const isUpToDate = currentVersion === latestVersion

  const simulateCheck = (newMin: string, newLatest: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setMinVersion(newMin)
      setLatestVersion(newLatest)
      setIsLoading(false)
    }, 500)
  }

  if (isLoading) return <LoadingState message="Checking for update..." />

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Force Update (Demo)</Text>
      <Text style={styles.subtitle}>Simulated version check without native modules</Text>

      <View style={styles.versionCard}>
        <Text style={styles.versionLabel}>Your Version</Text>
        <Text style={styles.versionValue}>{currentVersion}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Version Info</Text>
        <View style={styles.compareRow}><Text style={styles.compareLabel}>Min Required:</Text><Text style={styles.compareValue}>{minVersion}</Text></View>
        <View style={styles.compareRow}><Text style={styles.compareLabel}>Latest:</Text><Text style={styles.compareValue}>{latestVersion}</Text></View>
        <View style={styles.compareRow}>
          <Text style={styles.compareLabel}>Status:</Text>
          <Text style={[styles.compareValue, { color: isUpToDate ? Colors.success : needsUpdate ? Colors.error : Colors.warning }]}>
            {isUpToDate ? 'Up to date' : needsUpdate ? 'Update required' : 'Update available'}
          </Text>
        </View>
      </View>

      {needsUpdate && (
        <View style={styles.updateBanner}>
          <Text style={styles.updateText}>Update required to continue using this app</Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={() => simulateCheck('1.0.0', '1.0.0')}><Text style={styles.buttonText}>Up to Date Check</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: Colors.warning }]} onPress={() => simulateCheck('1.0.0', '1.5.0')}><Text style={styles.buttonText}>Optional Update</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: Colors.error }]} onPress={() => simulateCheck('2.0.0', '2.0.0')}><Text style={styles.buttonText}>Force Update</Text></TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Simulate Version Change</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.smallButton} onPress={() => setCurrentVersion('0.9.0')}><Text style={styles.buttonText}>0.9.0</Text></TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={() => setCurrentVersion('1.0.0')}><Text style={styles.buttonText}>1.0.0</Text></TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={() => setCurrentVersion('2.0.0')}><Text style={styles.buttonText}>2.0.0</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.md },
  title: { fontSize: FontSize.xxl, fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary },
  versionCard: { backgroundColor: Colors.surface, borderRadius: 12, padding: Spacing.md, borderWidth: 1, borderColor: Colors.border, alignItems: 'center', gap: Spacing.xs },
  versionLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  versionValue: { fontSize: FontSize.xxl, fontWeight: '700', color: Colors.text },
  section: { backgroundColor: Colors.surface, borderRadius: 12, padding: Spacing.md, borderWidth: 1, borderColor: Colors.border, gap: Spacing.sm },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.text },
  compareRow: { flexDirection: 'row', justifyContent: 'space-between' },
  compareLabel: { fontSize: FontSize.md, color: Colors.textSecondary },
  compareValue: { fontSize: FontSize.md, fontWeight: '500', color: Colors.text },
  updateBanner: { backgroundColor: Colors.error, padding: Spacing.md, borderRadius: 8 },
  updateText: { color: Colors.surface, fontSize: FontSize.md, fontWeight: '600', textAlign: 'center' },
  actions: { gap: Spacing.sm },
  button: { backgroundColor: Colors.primary, borderRadius: 8, padding: Spacing.md, alignItems: 'center' },
  buttonText: { color: Colors.surface, fontSize: FontSize.md, fontWeight: '600' },
  buttonRow: { flexDirection: 'row', gap: Spacing.sm },
  smallButton: { backgroundColor: Colors.secondary, borderRadius: 8, padding: Spacing.sm, flex: 1, alignItems: 'center' },
})
