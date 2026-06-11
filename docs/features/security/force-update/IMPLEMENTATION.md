# Force Update Implementation

## Architecture

- Current version from expo-application (nativeApplicationVersion)
- Fallback to expo-constants (expoConfig.version)
- Semantic version comparison (major.minor.patch)
- Configurable check-on-launch and check interval

## Flow

1. App starts → checkForUpdate(fetchMinVersion)
2. Fetch minimum required version from remote source
3. Compare current version vs min version
4. Current < Min → needsUpdate = true → show force update screen
5. Current >= Min → allow access
6. Optional: Also fetch latest version for optional update prompt

## Version Comparison

Uses numeric comparison of semver parts:
- 1.0.0 < 1.0.1 → minor patch
- 1.0.0 < 1.1.0 → minor update
- 1.0.0 < 2.0.0 → major update
