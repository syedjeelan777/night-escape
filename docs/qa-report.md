# QA Report — 2026-10-01

## Automated evidence

- `npm run validate-data`: PASS — 4 rooms, 3 enemies, 4 buildings, 4 waves.
- `npm test`: PASS — 12 tests covering deterministic random, state transitions, economy atomicity, centralized combat, pathfinding, room claim, build validation, elapsed-time income, door damage/repair, corrupt-save recovery and sanitization.
- `npm run typecheck`: PASS.
- `npm run build`: PASS.
- `npm run release-audit`: PASS.
- Development HTTP smoke request: PASS.

## Manual/browser matrix

| Test | Status | Notes |
|---|---|---|
| Live preview launch | AVAILABLE | Vite preview exposed on port 5173 |
| Full keyboard playthrough | NOT EXECUTED | No browser automation runtime is installed in the workspace |
| Mobile touch/device browser | NOT EXECUTED | Requires physical/emulated browser QA |
| Firefox/Safari/Edge | NOT EXECUTED | Requires external browser QA |
| Heavy-wave FPS/memory profiling | NOT EXECUTED | Debug FPS/entity telemetry exists; no measured result claimed |
| Long-session/restart soak | NOT EXECUTED | Requires interactive browser runner |
| Visual reference comparison | BLOCKED | Reference screenshots/footage were not supplied |

## Known test gaps

The integrated Phaser scene needs an interactive end-to-end pass covering room traversal, all build buttons, ally defeat, boss victory, player defeat, pause/resume, resize, touch cancellation and restart. Automated pure-system tests pass but do not substitute for that pass.
