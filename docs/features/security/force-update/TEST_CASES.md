# Force Update Test Cases

## Unit Tests
1. Compare identical versions → 0 (equal)
2. Compare 1.0.0 vs 1.0.1 → -1 (older)
3. Compare 2.0.0 vs 1.9.9 → 1 (newer)
4. Compare 1.0.0 vs 1.0.0 → equal

## Update Check Tests
5. Current < min → needsUpdate = true
6. Current >= min → needsUpdate = false
7. Current > min → update not required

## Version Parsing
8. Version "1" → parsed as [1,0,0]
9. Version "1.2" → parsed as [1,2,0]
10. Version "1.2.3.4" → parsed ignoring extra parts

## Edge Cases
11. Empty version string → 0.0.0
12. Non-numeric characters → NaN handling
13. Very large version numbers
14. Network failure during check → graceful fallback
