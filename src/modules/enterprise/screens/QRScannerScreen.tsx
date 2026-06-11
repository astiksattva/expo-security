import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { CameraView } from 'expo-camera'
import { Colors, Spacing, FontSize } from '../../../constants/theme'
import { ErrorState } from '../../../components/ErrorState'
import { LoadingState } from '../../../components/LoadingState'
import { EmptyState } from '../../../components/EmptyState'
import { useQRScanner } from '../hooks/useQRScanner'
import { BarcodeScanningResult, parseScanResult } from '../services/qrScannerService'

export function QRScannerScreen() {
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
      <Text style={styles.title}>QR Scanner</Text>
      <Text style={styles.description}>
        Scan QR codes using the device camera
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
          <TouchableOpacity style={styles.button} onPress={stopScanning}>
            <Text style={styles.buttonText}>Stop Scanning</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.controls}>
          {scannedData ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Scanned Data</Text>
              <Text style={styles.valueText}>{scannedData.data}</Text>
              <Text style={styles.labelText}>Type: {scannedData.type}</Text>
              <TouchableOpacity style={styles.button} onPress={resetScan}>
                <Text style={styles.buttonText}>Scan Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.controls}>
              {hasPermission === false ? (
                <EmptyState
                  title="Camera Permission Denied"
                  message="Enable camera access in Settings to use QR scanner"
                />
              ) : (
                <TouchableOpacity
                  style={[styles.button, styles.scanButton]}
                  onPress={startScanning}
                >
                  <Text style={styles.scanButtonText}>Start Scanning</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {error && !hasPermission === false && (
            <ErrorState message={error} onRetry={startScanning} />
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  cameraContainer: {
    flex: 1,
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
    gap: Spacing.md,
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
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  scanButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
  },
  scanButtonText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
})
