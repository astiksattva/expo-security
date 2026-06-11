# Security

## Risks

- **Battery read fingerprinting**: Battery level can be used to track users across sessions (battery-level fingerprinting)
- **Charging state leak**: Indicates if user is at home/work (plugged in)

## Mitigations

- Only access battery state when feature is explicitly enabled by user
- Do not log battery data to analytics without consent
- Consider rounding level to nearest 5% to reduce fingerprinting precision
