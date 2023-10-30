import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: 'Learning For Tzahal',
  slug: 'learning-for-tzahal',
  scheme: 'expo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: 'com.learningfortzahal',
    supportsTablet: true,
  },
  android: {
    package: 'com.learningfortzahal',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  extra: {
    eas: {
      projectId: 'b023f562-abdf-4ed5-964c-df4d3e40ef81',
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ['expo-router', './expo-plugins/with-modify-gradle.js'],
})

export default defineConfig
