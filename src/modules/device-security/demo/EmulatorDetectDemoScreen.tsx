import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { useEmulatorDetect } from '../hooks/useEmulatorDetect'
import { getErrorMessage } from '../../../utils/errors'

export function EmulatorDetectDemoScreen() {
  const { result, status, error, refetch } = useEmulatorDetect()

  if (status === 'scanning') return <LoadingState message="Running emulator detection demo..." />

  if (status === 'error') {
    return <ErrorState message={error || getErrorMessage(error)} onRetry={refetch} />
  }

  if (!result) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Emulator Detection Demo</Text>
        <Text style={styles.body}>No data available. Tap run detection below.</Text>
        <TouchableOpacity style={styles.button} onPress={refetch}>
          <Text style={styles.buttonText}>Run Detection</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Emulator Detection — Educational Demo</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Detection Result</Text>
        <Text style={styles.infoText}>
          Environment: {result.isEmulator ? '📱 Emulator / Simulator' : '✅ Physical Device'}
        </Text>
      </View>

      <View style={styles.technicalBox}>
        <Text style={styles.technicalTitle}>How Emulator Detection Works</Text>
        <Text style={styles.technicalText}>
          Uses expo-device's Device.isDevice flag as the primary indicator. On emulators,
          this returns false. Additionally checks device model name against known emulator
          model strings (e.g. "sdk_gphone64", "generic_x86") and known simulator identifiers
          (e.g. "iPhone Simulator", "x86_64"). This provides defense in depth against basic
          emulator detection bypass attempts.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detection Indicators</Text>
        {result.detections.length === 0 ? (
          <Text style={styles.body}>This appears to be a physical device — no emulator indicators found.</Text>
        ) : (
          result.detections.map((d, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.rowIndex}>{i + 1}.</Text>
              <Text style={styles.rowText}>{d}</Text>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={refetch}>
        <Text style={styles.buttonText}>Recheck</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.md },
  heading: { fontSize: FontSize.xxl, fontWeight: '700', color: Colors.text },
  body: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 22 },
  infoBox: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  infoTitle: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.text },
  infoText: { fontSize: FontSize.md, color: Colors.textSecondary },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.text },
  row: { flexDirection: 'row', gap: Spacing.sm },
  rowIndex: { fontSize: FontSize.md, color: Colors.primary, fontWeight: '600', width: 24 },
  rowText: { flex: 1, fontSize: FontSize.md, color: Colors.text },
  technicalBox: {
    backgroundColor: '#e8f0fe',
    borderRadius: 12,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: Spacing.sm,
  },
  technicalTitle: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.primary },
  technicalText: { fontSize: FontSize.md, color: Colors.text, lineHeight: 22 },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: Spacing.md,
    alignItems: 'center',
  },
  buttonText: { color: Colors.surface, fontSize: FontSize.lg, fontWeight: '600' },
})
