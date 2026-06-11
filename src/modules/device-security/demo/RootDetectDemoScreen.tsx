import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { useRootDetect } from '../hooks/useRootDetect'
import { isAndroid } from '../../../utils/platform'
import { getErrorMessage } from '../../../utils/errors'

export function RootDetectDemoScreen() {
  const { result, status, error, refetch } = useRootDetect()

  if (!isAndroid) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Root Detection — Educational Demo</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Platform Restriction</Text>
          <Text style={styles.infoText}>
            Root detection is Android-only. On iOS, use jailbreak detection instead. Root
            detection checks for superuser binaries (su), root management apps, and build
            property anomalies.
          </Text>
        </View>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`Relevant checks (Android):
  • /system/xbin/su existence
  • /sbin/su existence
  • Root management packages
  • Build tag analysis
  • Busybox detection`}
          </Text>
        </View>
      </ScrollView>
    )
  }

  if (status === 'scanning') return <LoadingState message="Running root detection demo..." />

  if (status === 'error') {
    return <ErrorState message={error || getErrorMessage(error)} onRetry={refetch} />
  }

  if (!result) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Root Detection Demo</Text>
        <Text style={styles.body}>No data available. Tap recheck to run detection.</Text>
        <TouchableOpacity style={styles.button} onPress={refetch}>
          <Text style={styles.buttonText}>Run Detection</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Root Detection — Educational Demo</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Detection Result</Text>
        <Text style={styles.infoText}>
          Status: {result.isRooted ? '⚠️ Rooted' : '✅ Secure'}
        </Text>
        <Text style={styles.infoText}>Confidence: {result.confidence}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detection Methods</Text>
        {result.detections.length === 0 ? (
          <Text style={styles.body}>No indicators found — device appears secure.</Text>
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
        <Text style={styles.technicalTitle}>How It Works</Text>
        <Text style={styles.technicalText}>
          Root detection scans for known indicators of Android root access. These include
          the presence of the su binary at various standard paths, root management
          applications like Magisk or SuperSU, and build property anomalies. Multiple
          positive signals increase the confidence score. Note: attackers can hide these
          indicators, so no detection method is 100% reliable.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={refetch}>
        <Text style={styles.buttonText}>Rescan</Text>
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
