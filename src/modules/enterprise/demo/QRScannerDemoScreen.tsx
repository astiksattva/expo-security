import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { CameraView } from 'expo-camera'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useQRScanner } from '../hooks/useQRScanner'
import { BarcodeScanningResult, parseScanResult } from '../services/qrScannerService'

export function QRScannerDemoScreen() {
  const {
    isScanning,
    scannedData,
    hasPermission,
    isLoading,
    error,
    startScanning,
    stopScanning,
    handleScan,
    resetScan,
  } = useQRScanner()

  const onBarcodeScanned = (result: BarcodeScanningResult) => {
    const parsed = parseScanResult(result)
    handleScan(parsed)
  }

  if (isLoading && hasPermission === null) {
    return <LoadingState message="Checking camera permission..." />
  }

  if (error && hasPermission === false) {
    return <ErrorState message={error} onRetry={startScanning} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>DEMO</Text>
      </View>

      <Text style={styles.title}>QR Scanner — Demo</Text>
      <Text style={styles.description}>
        Interactive demo for scanning QR codes using the device camera.
      </Text>

      {isScanning ? (
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={onBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
          />
          <View style={styles.overlay}>
            <View style={styles.scanFrame} />
          </View>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.stopButton} onPress={stopScanning}>
              <Text style={styles.stopButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          {scannedData ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Scanned QR Code</Text>
              <Text style={styles.valueText}>{scannedData.data}</Text>
              <Text style={styles.labelText}>Type: {scannedData.type}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={resetScan}>
                  <Text style={styles.buttonText}>Scan Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.startSection}>
              {hasPermission === false ? (
                <EmptyState
                  title="Camera Permission Denied"
                  message="Enable camera access in device Settings to scan QR codes"
                />
              ) : (
                <TouchableOpacity
                  style={styles.scanButton}
                  onPress={startScanning}
                >
                  <Text style={styles.scanButtonText}>Start Scanning</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {error && hasPermission !== false && (
            <ErrorState message={error} onRetry={startScanning} />
          )}

          {!scannedData && hasPermission !== false && !error && (
            <EmptyState
              title="No QR Code Scanned"
              message="Tap 'Start Scanning' and point the camera at a QR code"
            />
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Demo Notes</Text>
            <Text style={styles.noteText}>
              • Requires camera permission{'\n'}
              • Works on iOS and Android{'\n'}
              • Supports QR code format only in this demo{'\n'}
              • Auto-stops scanning after first detection
            </Text>
          </View>
        </View>
      )}
    </View>
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
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.warning,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.surface,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.xs,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  cameraContainer: {
    flex: 1,
    margin: Spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...(StyleSheet.absoluteFill as object),
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  controls: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
  },
  stopButtonText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: '600',
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
  valueText: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '500',
  },
  labelText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  startSection: {
    gap: Spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  scanButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  scanButtonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  noteText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
})
