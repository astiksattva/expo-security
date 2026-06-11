export interface FeatureInfo {
  id: string
  name: string
  category: FeatureCategory
  description: string
  supportStatus: 'stable' | 'beta' | 'planned'
  platformSupport: {
    ios: boolean
    android: boolean
    web: boolean
  }
  expoGo: boolean
  devBuild: boolean
  easBuild: boolean
  nativePrebuildRequired: boolean
}

export type FeatureCategory =
  | 'authentication'
  | 'screen-security'
  | 'device-security'
  | 'device-monitoring'
  | 'enterprise'
  | 'security'
  | 'dashboard'
