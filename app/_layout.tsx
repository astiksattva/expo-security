import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Colors } from '../src/constants/theme'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: Colors.surface },
            headerTintColor: Colors.text,
            headerTitleStyle: { fontWeight: '600' },
          }}
        >
          <Stack.Screen name="index" options={{ title: 'Expo Security Lab' }} />
          <Stack.Screen name="dashboard/index" options={{ title: 'Dashboard' }} />
          <Stack.Screen name="auth/[id]" options={{ title: 'Authentication' }} />
          <Stack.Screen name="screen-security/[id]" options={{ title: 'Screen Security' }} />
          <Stack.Screen name="device-security/[id]" options={{ title: 'Device Security' }} />
          <Stack.Screen name="device-monitoring/[id]" options={{ title: 'Device Monitoring' }} />
          <Stack.Screen name="enterprise/[id]" options={{ title: 'Enterprise' }} />
          <Stack.Screen name="security/[id]" options={{ title: 'Security' }} />
        </Stack>
      </View>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
})
