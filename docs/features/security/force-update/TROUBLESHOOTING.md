# Force Update Troubleshooting

## Common Issues

### Version check always returns false
- getCurrentAppVersion returns unexpected value
- Remote fetch function not implemented
- CORS/network issue with remote config endpoint

### Wrong version detected
- nativeApplicationVersion vs expoConfig.version mismatch
- Build number used instead of version
- Expo Go reports different version than dev build

### Update screen shows incorrectly
- Version comparison logic error
- Multiple digit parts (10.0.0 vs 9.0.0)
- Prefix/suffix in version strings

## Debugging Tips
- Log current version at app startup
- Test version comparison logic separately
- Use a mock remote config for development
- Verify version in app.json matches native build
