# Force Update Interview Notes

## Key Concepts
- Semantic versioning
- Remote config for minimum version
- OTA updates vs native app updates
- Staged rollouts

## Common Questions
1. How do you handle force update for OTA updates vs native updates?
   > OTA updates (expo-updates) can be pushed silently. Native updates
   > require App Store/Play Store submission and approval.

2. What's the difference between min version and latest version?
   > Min version is the minimum supported version (block if below).
   > Latest version is the most recent release (optional update).

3. How do you avoid infinite update prompts?
   > Use cooldown period between checks. Allow "remind me later"
   > for optional updates (not force updates).

4. How do you handle users on unsupported OS versions?
   > Check OS version separately. The app minimum OS requirement
   > is set in app.json/app.config.js.
