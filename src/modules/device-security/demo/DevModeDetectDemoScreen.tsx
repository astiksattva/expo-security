import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { useDevModeDetect } from '../hooks/useDevModeDetect'
import { isAndroid } from '../../../utils/platform'
import { getErrorMessage } from '../../../utils/errors'

export function DevModeDetectDemoScreen() {
  const { result, status, error, refetch } = useDevModeDetect()

  if (!isAndroid) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Developer Mode Detection — Educational Demo</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Platform Restriction</Text>
          <Text style={styles.infoText}>
            Developer mode detection is Android-only. iOS does not have an equivalent
            developer mode concept in the same way. The feature checks
            Settings.Secure / Settings.Global for developer options flags, ADB status,
            and availability of developer settings intents.
          </Text>
        </View>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`Relevant checks (Android):
  • ADB enabled status
  • Developer settings availability
  • Build property analysis
  • Dev menu enabled flag`}
          </Text>
        </View>
      </ScrollView>
    )
  }

  if (status === 'scanning') return <LoadingState message="Running dev mode detection demo..." />

  if (status === 'error') {
    return <ErrorState message={error || getErrorMessage(error)} onRetry={refetch} />
  }

  if (!result) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Developer Mode Detection Demo</Text>
        <Text style={styles.body}>No data available. Tap run detection below.</Text>
        <TouchableOpacity style={styles.button} onPress={refetch}>
          <Text style={styles.buttonText}>Run Detection</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Developer Mode Detection — Educational Demo</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Detection Result</Text>
        <Text style={styles.infoText}>
          Status: {result.isDevModeEnabled ? '⚠️ Developer Mode ON' : '✅ Developer Mode OFF'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detection Indicators</Text>
        {result.detections.length === 0 ? (
          <Text style={styles.body}>No developer mode indicators detected.</Text>
        ) : (
          result.detections.map((d, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.rowIndex}>{i + 1}.</Text>
              <Text style={styles.rowText}>{d}</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.technicalBox}>
        <Text style={styles.technicalTitle}>Why Developer Mode Matters</Text>
        <Text style={styles.technicalText}>
          Developer mode on Android enables USB debugging, mock locations, and various
          privileged operations. Apps handling sensitive data should detect this and
          consider it a risk indicator. However, many legitimate developers need this mode,
          so it should be used as a signal rather than a hard block.
        </Text>
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
  codeBlock: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: Spacing.md,
  },
  codeText: { fontFamily: 'monospace', fontSize: FontSize.sm, color: '#d4d4d4', lineHeight: 20 },
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
