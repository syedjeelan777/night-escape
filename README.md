# Night Escape

A browser-first, original-art survival room-defense game inspired by the researched structure of **Survival Night: Room Escape**. The named research files were not present in the initial repository; reference-specific values are therefore documented as unresolved, while playable values are explicitly tagged `WEB_ADAPTATION`.

## Run

```bash
npm install
npm run dev       # development server
npm run build     # strict TypeScript + production bundle
npm run preview   # serve production bundle
```

Static deployment: upload `dist/` to any HTTPS static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, or CDN). Asset URLs are relative and no backend or secrets are required.

## Controls

- **Move:** WASD / arrow keys, or drag the lower-left touch joystick
- **Interact / claim:** E, Space, or INTERACT
- **Build:** choose a defense in the bottom bar, then click/tap a glowing slot
- **Upgrade defense:** click/tap an occupied slot
- **Repair / upgrade bed / upgrade door:** bottom bar actions
- **Pause:** Escape; tab switching also pauses safely

## Game flow

Escape the pursuing Hunter, claim one of four rooms, earn gold from the bed, build and upgrade defenses, protect player and ally safehouses through four data-driven waves, and defeat the Night Keeper. Door breaches are real; enemies enter and attack the player. Victory and defeat update local progression and enable restart.

## Architecture

- `src/core/GameSession.ts`: authoritative serializable session state and room/economy actions
- `src/systems/`: state machine, fixed-step simulation, combat, economy, pathfinding, save, audio, events
- `src/scenes/`: boot/loading, menu, tutorial, mode selection, integrated escape/defense game
- `src/data/production/game.json`: human-readable versioned balance/content
- `requirements/requirements-matrix.md`: source-to-code/test traceability
- Procedural Phaser vector art keeps the visual set original and avoids unlicensed assets.

The simulation advances at a fixed 60 Hz with a capped frame delta. Gameplay randomness is seedable. Currency transactions and damage pass through central authorities. Saves are versioned, sanitized, and recover safely from corruption.

## Data and validation

```bash
npm run validate-data
npm test
npm run typecheck
npm run release-audit
```

All adaptation values are centralized in `game.json`. Change enemy health, speed, damage, costs, gold rate, rooms, waves, and modes without editing gameplay code.

## Save data

Small progression/settings data uses `localStorage` under `night-escape-save`. Save schema v1 sanitizes values and falls back safely after malformed JSON. Transient enemies/projectiles are intentionally not persisted.

## Known unresolved research values

See `src/config/unknownValues.ts` and requirements rows marked **BLOCKED**. Exact original speeds, room coordinates, wave timings, enemy/boss stats, upgrade prices, gold generation, roster, media inventory, and runtime failure nuances cannot be claimed until the ten source research files are supplied.

## Browser notes

Designed for current Chromium, Firefox, and Safari browsers with WebGL and Phaser Canvas fallback. Rendering DPR is capped at 2. Responsive FIT scaling preserves aspect ratio; safe-area CSS and touch cancellation are supported. Audio is synthesized only after user interaction and never gates gameplay.
