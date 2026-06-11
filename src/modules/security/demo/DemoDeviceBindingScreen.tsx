import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Colors, Spacing, FontSize } from '../../../constants/theme'

interface DemoBinding {
  deviceId: string
  boundAt: number
  lastVerified: number
}

const DEMO_DEVICE_ID = 'demo-device-' + Math.random().toString(36).substring(2, 10)

export function DemoDeviceBindingScreen() {
  const [binding, setBinding] = useState<DemoBinding | null>(null)
  const [currentDeviceId] = useState(DEMO_DEVICE_ID)
  const [isVerified, setIsVerified] = useState(false)

  const bindDevice = () => {
    const newBinding: DemoBinding = {
      deviceId: currentDeviceId,
      boundAt: Date.now(),
      lastVerified: Date.now(),
    }
    setBinding(newBinding)
    setIsVerified(true)
  }

  const unbindDevice = () => {
    setBinding(null)
    setIsVerified(false)
  }

  const verifyBinding = () => {
    if (!binding) return
    setIsVerified(binding.deviceId === currentDeviceId)
    setBinding({ ...binding, lastVerified: Date.now() })
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Device Binding (Demo)</Text>
      <Text style={styles.subtitle}>Simulated device binding with in-memory state</Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Binding Status</Text>
        <View style={styles.statusRow}><Text style={styles.statusKey}>Bound:</Text><Text style={[styles.statusValue, { color: binding ? Colors.success : Colors.textSecondary }]}>{binding ? 'Yes' : 'No'}</Text></View>
        <View style={styles.statusRow}><Text style={styles.statusKey}>Verified:</Text><Text style={[styles.statusValue, { color: isVerified ? Colors.success : Colors.error }]}>{isVerified ? 'Yes' : 'No'}</Text></View>
        <View style={styles.statusRow}><Text style={styles.statusKey}>Device ID:</Text><Text style={styles.statusValue}>{currentDeviceId.substring(0, 16)}...</Text></View>
      </View>

      {binding && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Binding Details</Text>
          <View style={styles.detailRow}><Text style={styles.detailLabel}>Bound At:</Text><Text style={styles.detailValue}>{new Date(binding.boundAt).toLocaleString()}</Text></View>
          <View style={styles.detailRow}><Text style={styles.detailLabel}>Last Verified:</Text><Text style={styles.detailValue}>{new Date(binding.lastVerified).toLocaleString()}</Text></View>
        </View>
      )}

      <View style={styles.actions}>
        {binding ? (
          <>
            <TouchableOpacity style={[styles.button, { backgroundColor: Colors.success }]} onPress={verifyBinding}><Text style={styles.buttonText}>Verify Binding</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: Colors.error }]} onPress={unbindDevice}><Text style={styles.buttonText}>Unbind Device</Text></TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.button} onPress={bindDevice}><Text style={styles.buttonText}>Bind Device</Text></TouchableOpacity>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.md },
  title: { fontSize: FontSize.xxl, fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: FontSize.md, color: Colors.textSecondary },
  statusCard: { backgroundColor: Colors.surface, borderRadius: 12, padding: Spacing.md, borderWidth: 1, borderColor: Colors.border, gap: Spacing.sm },
  statusLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 1 },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statusKey: { fontSize: FontSize.md, color: Colors.textSecondary },
  statusValue: { fontSize: FontSize.md, fontWeight: '500', color: Colors.text },
  section: { backgroundColor: Colors.surface, borderRadius: 12, padding: Spacing.md, borderWidth: 1, borderColor: Colors.border, gap: Spacing.sm },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.text },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between' },
  detailLabel: { fontSize: FontSize.md, color: Colors.textSecondary },
  detailValue: { fontSize: FontSize.md, fontWeight: '500', color: Colors.text },
  actions: { gap: Spacing.sm },
  button: { backgroundColor: Colors.primary, borderRadius: 8, padding: Spacing.md, alignItems: 'center' },
  buttonText: { color: Colors.surface, fontSize: FontSize.md, fontWeight: '600' },
})
