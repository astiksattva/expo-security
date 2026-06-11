import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { useMockLocationDetect } from '../hooks/useMockLocationDetect'
import { isAndroid } from '../../../utils/platform'
import { getErrorMessage } from '../../../utils/errors'

export function MockLocationDetectDemoScreen() {
  const { result, status, error, refetch } = useMockLocationDetect()

  if (!isAndroid) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Mock Location Detection — Educational Demo</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Platform Restriction</Text>
          <Text style={styles.infoText}>
            Mock location detection is Android-only. iOS does not expose a mock location
            provider API to third-party apps. The feature checks Settings.Secure for
            ALLOW_MOCK_LOCATION, location provider status, and ContentResolver settings.
          </Text>
        </View>
        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {`Relevant checks (Android):
  • ALLOW_MOCK_LOCATION setting
  • ADB enabled status
  • Location provider analysis
  • ContentResolver queries
  • Dev options mock location flag`}
          </Text>
        </View>
      </ScrollView>
    )
  }

  if (status === 'scanning') return <LoadingState message="Running mock location detection demo..." />

  if (status === 'error') {
    return <ErrorState message={error || getErrorMessage(error)} onRetry={refetch} />
  }

  if (!result) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Mock Location Detection Demo</Text>
        <Text style={styles.body}>No data available. Tap run detection below.</Text>
        <TouchableOpacity style={styles.button} onPress={refetch}>
          <Text style={styles.buttonText}>Run Detection</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Mock Location Detection — Educational Demo</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Detection Result</Text>
        <Text style={styles.infoText}>
          Status: {result.isMockLocationEnabled ? '⚠️ Mock Location Active' : '✅ Real Location'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detection Indicators</Text>
        {result.detections.length === 0 ? (
          <Text style={styles.body}>No mock location indicators detected.</Text>
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
        <Text style={styles.technicalTitle}>Why Mock Location Detection Matters</Text>
        <Text style={styles.technicalText}>
          Mock location providers allow users to spoof their GPS coordinates. This is a
          security concern for apps that depend on location authenticity, such as
          ride-sharing, banking, or geo-fencing applications. Detection relies on reading
          Android system settings that indicate whether mock locations are allowed. Note
          that on Android 10+ (API 29+), Google deprecated ALLOW_MOCK_LOCATION and
          moved mock location control to developer options only.
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
