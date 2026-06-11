# SSL Pinning Test Cases

## Unit Tests
1. Add a pin → verify with matching hash → isValid = true
2. Add a pin → verify with non-matching hash → isValid = false
3. Verify with no pins configured → error = NO_PINS_CONFIGURED
4. Add multiple pins → verify each → all match
5. Remove a pin → verify → no longer matches

## Integration Tests
6. Configure empty config → verify → returns false
7. Verify same host, different hashes → only matching succeeds
8. Clear pins → verify any host → returns false
9. Double-add same pin → verify → still matches

## Edge Cases
10. Empty host string in pin
11. Empty hash string
12. Case sensitivity of host matching
13. Unicode characters in hostnames
14. Maximum pin count performance
