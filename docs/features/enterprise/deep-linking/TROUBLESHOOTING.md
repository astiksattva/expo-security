# Troubleshooting — Deep Linking

## Common Issues

### Deep link not opening the app
**Cause**: URL scheme not configured correctly
**Solution**: Verify `scheme` in `app.json` and check platform-specific config

### Initial URL is null on cold start
**Cause**: App was not launched via deep link
**Solution**: Test by launching from terminal with deep link URL

### Expo Router not handling deep link
**Cause**: Linking config not passed to Expo Router
**Solution**: Ensure `getLinkingConfig()` is integrated with `expo-router`

### Deep link with special characters fails
**Cause**: URL encoding issues
**Solution**: Ensure parameters are URL-encoded before creating links

## Debug Methods

- Use `Linking.parse(url)` to debug URL structure
- Monitor console logs for `[deep-linking]` tag
- Test with simple URLs first, then add complexity
