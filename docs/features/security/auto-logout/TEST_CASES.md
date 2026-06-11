# Auto Logout Test Cases

## Unit Tests
1. Record activity → check status → not timed out
2. Wait > timeout → check status → isTimedOut = true
3. Record activity twice → status updates correctly
4. Configure timeout → reflects in config getter

## Timer Tests
5. Start monitor → stop monitor → no callbacks after stop
6. Start monitor → wait for warning → callback fired
7. Start monitor → wait for timeout → callback fired

## Activity Recording
8. Record activity during monitor → timer resets
9. Multiple rapid activity records → no errors
10. Activity recorded after timeout → timer resets

## Edge Cases
11. Start monitor twice → no duplicate timers
12. Stop monitor when not running → no error
13. Configure with warning > timeout → warning never shows
14. Timer accuracy across 1000+ ticks
