# API Documentation

The IKIGAI platform relies on **React Server Actions** and direct **Supabase SDK** calls rather than traditional REST endpoints. 

## Authentication (Supabase Auth)
- Login: `AuthService.signInWithEmail(email, password)`
- Logout: `AuthService.signOut()`

## Leaderboard Operations
- Calculate Leaderboard: `calculateRankings(entries, strategy)`
- State Builder: `buildLeaderboardState(rawEntries, status)`

## Event Operations
- Process Scan: `scanEngine.processScan({ rawPayload, checkpoint, volunteerId, deviceId })`
- Validate QR Integrity: `qrValidator.validatePayloadIntegrity(payload)`
- Check Offline Queue: `offlineQueueRepository.getQueue()`

## Live Event System
- Subscribe to events: `liveEventBus.subscribe(LiveEventType.TEAM_UPDATED, callback)`
- Emit event: `liveEventBus.emit(event)`
