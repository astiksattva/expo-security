# Expo Limitations

| Limitation | Detail |
|------------|--------|
| Web | `AppState` on web is limited; `currentState` always `'active'` |
| No background time limit | iOS may suspend JS execution; time accumulates imprecisely |
| No notification events | Cannot detect if user responded to notification |
| No lock screen detection | Cannot differentiate locked from backgrounded |
| No process lifecycle | Cannot detect app being killed (use `expo-updates` for restart) |
| `inactive` state iOS only | Android transitions directly active↔background |
