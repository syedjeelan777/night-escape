# Survival Night: Room Escape — Requirements Traceability Matrix

_Last updated: 2026-10-01_

## Evidence and source availability

The repository was inspected before this matrix was created. At inspection time it contained only `README.md`; none of the ten named research/specification files, screenshots, footage, extracted metadata, or JSON datasets were present anywhere under the repository or `/home/user`.

Consequences:

- Requirements explicitly stated by the supplied Master Build Prompt/Addendum are labeled **VERIFIED** (verified project requirement, not verified reference-game behavior).
- Reference-specific values and behaviors that require a missing research source are labeled **UNKNOWN** and must remain centralized unresolved data until evidence is supplied.
- Browser/platform engineering choices required by the prompt are labeled **VERIFIED** and comparison results may be **WEB_ADAPTATION**.
- No inferred value may later be upgraded to VERIFIED without a source citation.

Status vocabulary: **PLANNED**, **IMPLEMENTED**, **TESTED**, **BLOCKED**, **UNKNOWN**. A feature is not TESTED until its cited test has run successfully.

## Source index

| Code | Source | Availability |
|---|---|---|
| MBP | Master Build Prompt §§1–57 in task message | Available |
| ADD | Master Prompt Addendum §§58–122 in task message | Available |
| P1 | `Survival_Night_Web_Recreation_Phase1.md` | Missing |
| P2M | `Survival_Night_Web_Recreation_Phase2_ExactData.md` | Missing |
| P2J | `Survival_Night_Web_Build_Data_Phase2.json` | Missing |
| P3M | `Survival_Night_Web_Recreation_Phase3_ExactData.md` | Missing |
| P3J | `Survival_Night_Web_Build_Data_Phase3.json` | Missing |
| P4 | `Survival_Night_Web_Recreation_Phase4_VisualAudioInventory.md` | Missing |
| P5 | `Survival_Night_Web_Master_Implementation_Spec_Phase5.md` | Missing |
| P6 | `Survival_Night_Web_Recreation_Phase6_RuntimeSystemDiscovery.md` | Missing |
| P7M | `Survival_Night_Web_Recreation_Phase7_RuntimeBehaviorSpec.md` | Missing |
| P7J | `Survival_Night_Web_RuntimeBehavior_Schema_Phase7.json` | Missing |

## Requirements matrix

| Feature ID | Feature name | Source document | Evidence | Implementation system | Implementation files | Data source | Test case | Status |
|---|---|---|---|---|---|---|---|---|
| PRJ-001 | Vite + strict TypeScript + Phaser 3 project | MBP §4, §50 | VERIFIED | Build/toolchain | `package.json`, `vite.config.ts`, `tsconfig*.json`, `src/main.ts` | package/config | `npm run typecheck`; production build | TESTED |
| PRJ-002 | Modular architecture and separation of concerns | MBP §5, §50 | VERIFIED | Project architecture | `src/{scenes,entities,systems,data,ui,input,...}` | N/A | architecture/import review | IMPLEMENTED |
| PRJ-003 | Static HTTPS-host-compatible production output | ADD §93 | VERIFIED | Build/toolchain | `vite.config.ts`, asset URLs | relative paths | preview smoke test | IMPLEMENTED |
| PRJ-004 | Feature flags; test data separated | ADD §§102–103 | VERIFIED | Configuration | `src/config/features.ts`, `src/data/development/` | config | production flag test | IMPLEMENTED |
| PRJ-005 | No browser secrets/backend dependency | ADD §§94–95, §107 | VERIFIED | Architecture | client-only source | N/A | offline build smoke test | IMPLEMENTED |
| DAT-001 | Human-readable versioned game data | MBP §6; ADD §§66, 109–110 | VERIFIED | Data repository | `src/data/production/*.json`, schemas | supplied JSON when available | data repository tests | TESTED |
| DAT-002 | Validate levels/items/enemies/waves/hunters/characters/upgrades/maps/references | ADD §§65,111 | VERIFIED | Data validator | `scripts/validate-data.ts`, `scripts/validate-data.ts` | production JSON | `npm run validate-data` | TESTED |
| DAT-003 | Reject duplicate/missing IDs and invalid values/references | ADD §111 | VERIFIED | Data validator | same as DAT-002 | schemas | invalid fixture tests | TESTED |
| DAT-004 | Asset manifest with loading tier, usage and fallback | ADD §74 | VERIFIED | Asset management | `public/assets/assets.manifest.json` | manifest | manifest validation | IMPLEMENTED |
| DAT-005 | Exact reference balance values | MBP §§1,7,54 | UNKNOWN | Central balance config | `src/data/production/balance.json`, `src/config/unknownValues.ts` | P2/P3/P7 (missing) | unresolved-value audit | BLOCKED |
| DAT-006 | Exact reference map/room coordinates | MBP §§11–12 | UNKNOWN | Level data | `src/data/production/levels/*.json` | P2/P3/P7 (missing) | map schema + reachability | BLOCKED |
| DAT-007 | Exact inventory, animation, audio inventory | MBP §§20–23,35–36 | UNKNOWN | Content data | `src/data/production/{buildings,animations,audio}.json` | P2/P3/P4 (missing) | reference audit | BLOCKED |
| STA-001 | Authoritative serializable GameState | ADD §64 | VERIFIED | Game state manager | `src/core/GameSession.ts`, `src/types/game.ts` | validated initial state | state consistency tests | IMPLEMENTED |
| STA-002 | Required explicit game states | MBP §8 | VERIFIED | State machine | `src/systems/GameStateMachine.ts` | state transition data | valid/invalid transition tests | TESTED |
| STA-003 | Deterministic validated transitions | MBP §8 | VERIFIED | State machine | same as STA-002 | transition graph | transition test suite | TESTED |
| STA-004 | Fixed/controlled simulation timestep | ADD §61 | VERIFIED | Main simulation | `src/systems/FixedStepSimulation.ts` | timing config | 30/60/120 FPS equivalence | TESTED |
| STA-005 | Seeded deterministic RandomService | ADD §62 | VERIFIED | Utility service | `src/utils/RandomService.ts` | seed | reproducibility tests | TESTED |
| STA-006 | Central typed event bus | ADD §63 | VERIFIED | Event system | `src/systems/GameEventBus.ts` | event contracts | subscribe/unsubscribe/order tests | IMPLEMENTED |
| STA-007 | Structured gameplay event log and debug seed | ADD §§88–89 | VERIFIED | Debug/replay | `src/debug/EventLog.ts`, `src/debug/ReplayRecorder.ts` | runtime events | event-log/replay tests | PLANNED |
| STA-008 | Entity lifecycle safety | ADD §80 | VERIFIED | Entity registry | Entity lifecycle fields in `src/scenes/GameplayScene.ts` | lifecycle enum | stale/destroyed entity tests | IMPLEMENTED |
| BOOT-001 | Boot → real preload progress → menu | MBP §§2–3; ADD §75 | VERIFIED | Boot/preload scenes | `src/scenes/BootScene.ts` | asset manifest | loading integration test | IMPLEMENTED |
| BOOT-002 | Missing asset safe fallback/recovery | MBP §41; ADD §101 | VERIFIED | Loader/error UI | preload + `RecoveryPanel` | manifest fallbacks | missing-asset test | IMPLEMENTED |
| MEN-001 | Functional main menu and Play | MBP §2, §28 | VERIFIED | Menu scene/UI | `src/scenes/MenuScene.ts` | UI config | menu-to-mode E2E | IMPLEMENTED |
| MEN-002 | Settings (mute, volume, reduced motion, controls) | MBP §28; ADD §90 | VERIFIED | Settings UI/system | `src/scenes/MenuScene.ts`, save system | settings defaults | settings persistence test | IMPLEMENTED |
| MEN-003 | Progression display | MBP §28 | VERIFIED | Menu/progression UI | `src/scenes/MenuScene.ts` | progression definitions | unlock display test | IMPLEMENTED |
| MOD-001 | Functional mode/difficulty selection | MBP §§2,26 | VERIFIED | Mode scene/difficulty | `src/scenes/ModeScene.ts`, `src/scenes/GameplayScene.ts` | modes JSON | mode selection test | IMPLEMENTED |
| MOD-002 | Exact extracted modes and hunter relationships | MBP §26 | UNKNOWN | Difficulty data | `src/data/production/modes.json` | P2/P3/P7 (missing) | reference comparison | BLOCKED |
| MAP-001 | Real navigable tile/grid map | MBP §12 | VERIFIED | Map system | `src/scenes/GameplayScene.ts` | levels JSON | bounds/collision/reachability tests | IMPLEMENTED |
| MAP-002 | Floors, walls, corridors, doors, rooms, spawn/build/blocked/nav cells | MBP §12 | VERIFIED | Map layers | `src/scenes/GameplayScene.ts` | levels JSON | layer validation tests | IMPLEMENTED |
| MAP-003 | Collision based on actual map data | MBP §§9,12 | VERIFIED | Collision system | `src/scenes/GameplayScene.ts` | level collision layer | collision tests | IMPLEMENTED |
| MAP-004 | Responsive camera follow, bounds, zoom, shake | MBP §34 | VERIFIED | Camera controller | `src/scenes/GameplayScene.ts` | camera config | resize/bounds tests | IMPLEMENTED |
| PTH-001 | Pathfinding abstraction: A*, BFS, Dijkstra, fallback | MBP §13 | VERIFIED | Pathfinding system | `src/systems/PathfindingSystem.ts`, `src/pathfinding/*` | nav grid | algorithm correctness tests | TESTED |
| PTH-002 | Avoid blocks/walls/closed doors and recalc on nav changes | MBP §13 | VERIFIED | Pathfinding/nav revision | same as PTH-001 | dynamic grid | dynamic-door path test | TESTED |
| PTH-003 | Unreachable-target fallback, budget, no infinite loops | MBP §13; ADD §§78–79 | VERIFIED | AI/path safety | same as PTH-001 | AI config | unreachable/budget tests | TESTED |
| PLY-001 | Frame-rate-independent movement (WASD/arrows/touch) | MBP §§9,32–33 | VERIFIED | Player/input | `src/scenes/GameplayScene.ts` | player data | movement/FPS tests | IMPLEMENTED |
| PLY-002 | Player collision and world bounds | MBP §9 | VERIFIED | Player/collision | same as PLY-001, collision system | map/player data | collision test | IMPLEMENTED |
| PLY-003 | Direction and animation state | MBP §§9,35 | VERIFIED | Player state/animation | `src/scenes/GameplayScene.ts` | animations JSON | state mapping test | IMPLEMENTED |
| PLY-004 | IDLE/MOVING/INTERACTING/SLEEPING/BUILDING/REPAIRING/HIT/DEAD | MBP §9 | VERIFIED | Player FSM | `src/scenes/GameplayScene.ts` | player state enum | player-state tests | IMPLEMENTED |
| PLY-005 | Room detection, interaction and claiming | MBP §9 | VERIFIED | Player/room interaction | `src/core/GameSession.ts`, `src/scenes/GameplayScene.ts` | rooms data | room-entry/claim tests | IMPLEMENTED |
| PLY-006 | Damage, hit state, death and restart | MBP §9 | VERIFIED | Combat/player lifecycle | `src/systems/CombatSystem.ts`, `src/scenes/GameplayScene.ts` | combat data | damage/death/restart tests | IMPLEMENTED |
| ESC-001 | Spawn and navigate house without teleporting | MBP §10 | VERIFIED | Escape scene | `src/scenes/GameplayScene.ts` | level spawn data | escape E2E | IMPLEMENTED |
| ESC-002 | Available-room detection and entry | MBP §10 | VERIFIED | Room system | `src/core/GameSession.ts`, `src/scenes/GameplayScene.ts` | rooms data | room availability test | IMPLEMENTED |
| ESC-003 | Hunter pursuit during escape | MBP §10 | VERIFIED | Hunter AI | `HunterAISystem.ts` | hunter data | pursuit E2E | IMPLEMENTED |
| ESC-004 | Reference-specific escape failure behavior | MBP §10 | UNKNOWN | Escape/state machine | escape scene | P7 runtime behavior (missing) | reference comparison | BLOCKED |
| ROM-001 | Room data: id, bounds, door, bed, walls, floor, slots, occupancy, owner | MBP §11 | VERIFIED | Room entities/data | `src/core/GameSession.ts`, `src/data/production/game.json` | rooms data | room schema test | IMPLEMENTED |
| ROM-002 | EMPTY→CLAIMED→LOCKED→DEFENDING→BREACHED→DEFEATED lifecycle | MBP §11 | VERIFIED | Room system/FSM | `src/core/GameSession.ts`, `src/scenes/GameplayScene.ts` | room transitions | room lifecycle tests | IMPLEMENTED |
| ROM-003 | Atomic room claim and ownership | MBP §11 | VERIFIED | Room system | `src/core/GameSession.ts`, `src/scenes/GameplayScene.ts` | room state | duplicate claim test | TESTED |
| ROM-004 | Room breach and defeat | MBP §§11,19 | VERIFIED | Room/combat | `src/core/GameSession.ts`, `src/scenes/GameplayScene.ts`, `Door.ts` | combat data | breach/defeat tests | IMPLEMENTED |
| DOR-001 | Door level/current HP/max HP/damage states | MBP §19 | VERIFIED | Door entity | `src/core/GameSession.ts`, `src/scenes/GameplayScene.ts` | door JSON | door damage tests | TESTED |
| DOR-002 | Lock, repair, upgrade and cost validation | MBP §19 | VERIFIED | Door/economy/upgrade | `src/core/GameSession.ts` | door upgrades JSON | lock/repair/upgrade tests | TESTED |
| DOR-003 | Destroy/breach updates visuals, nav and room | MBP §19 | VERIFIED | Door/room/path/events | same as DOR-002 | door states | destruction integration test | IMPLEMENTED |
| BED-001 | Bed level and elapsed-time gold generation | MBP §17 | VERIFIED | Bed/economy | `src/core/GameSession.ts`, `src/systems/EconomySystem.ts` | bed JSON | generation timing test | TESTED |
| BED-002 | Bed interaction and atomic upgrade | MBP §17 | VERIFIED | Interaction/upgrade | `src/core/GameSession.ts` | bed upgrades JSON | bed upgrade test | IMPLEMENTED |
| BED-003 | Bed animation/audio feedback hooks | MBP §17 | VERIFIED | Animation/audio events | bed + event bus | animation/audio map | emitted-event test | IMPLEMENTED |
| ECO-001 | Authoritative non-negative gold | MBP §18; ADD §§64,82 | VERIFIED | Economy system | `src/systems/EconomySystem.ts` | economy data | balance invariant tests | TESTED |
| ECO-002 | Atomic purchase validate→execute→commit | MBP §18; ADD §82 | VERIFIED | Transaction authority | `EconomySystem.ts` | costs JSON | purchase/insufficient tests | TESTED |
| ECO-003 | Duplicate-input/double-spend prevention | MBP §§18,29; ADD §83 | VERIFIED | Transactions/input debounce | economy/input | transaction IDs/config | rapid-input tests | TESTED |
| BLD-001 | Build selection, costs, valid/invalid placement preview | MBP §20 | VERIFIED | Building system/UI | `src/core/GameSession.ts`, `src/scenes/GameplayScene.ts` | buildings/level slots JSON | placement tests | TESTED |
| BLD-002 | Atomic placement and activation | MBP §20 | VERIFIED | Building/economy | same as BLD-001 | building data | purchase-placement rollback test | TESTED |
| BLD-003 | Building upgrade/removal where documented | MBP §20 | VERIFIED/UNKNOWN | Upgrade/building | `src/core/GameSession.ts`, `src/scenes/GameplayScene.ts` | P2/P3 missing | upgrade test; removal blocked pending evidence | IMPLEMENTED |
| TUR-001 | Turret detect/select/check range/attack/cooldown/switch | MBP §22 | VERIFIED | Turret system | `src/scenes/GameplayScene.ts` | building definitions | targeting/cooldown tests | IMPLEMENTED |
| TUR-002 | Projectile behavior and pooling | MBP §§22,27; ADD §77 | VERIFIED | Projectile pool/combat | `src/scenes/GameplayScene.ts` | projectile data | projectile/pool tests | IMPLEMENTED |
| TUR-003 | Functional turret upgrades | MBP §22 | VERIFIED | Upgrade/turret | `UpgradeSystem.ts` | building upgrades | turret-upgrade combat test | IMPLEMENTED |
| TRP-001 | Trap placement, trigger condition, effect, cooldown/reset | MBP §23 | VERIFIED | Trap system | `src/scenes/GameplayScene.ts` | traps JSON | trigger/cooldown tests | IMPLEMENTED |
| TRP-002 | Trap damage/status and upgrade | MBP §23 | VERIFIED | Combat/status/upgrade | trap/combat systems | traps/upgrades JSON | damage/status/upgrade tests | IMPLEMENTED |
| DEF-001 | Documented turret/special gun categories | MBP §21 | UNKNOWN | Defensive content | building systems/data | P2/P3/P4 missing | reference inventory test | BLOCKED |
| DEF-002 | Electric traps and mines | MBP §21 | VERIFIED | Trap system | trap files | adaptation data pending source | electric/mine tests | IMPLEMENTED |
| DEF-003 | Radar/utility systems | MBP §21 | VERIFIED | Utility building system | `src/scenes/GameplayScene.ts` | adaptation data pending source | utility-effect test | IMPLEMENTED |
| DEF-004 | Buff/support items and special devices | MBP §21 | VERIFIED | Buff system | Not implemented | adaptation data pending source | buff lifecycle test | PLANNED |
| CMB-001 | Central damage pipeline | MBP §27; ADD §81 | VERIFIED | Combat system | `src/systems/CombatSystem.ts` | combat definitions | validation/modifier/death tests | TESTED |
| CMB-002 | Health, armor/modifiers, invulnerability, hit/death | MBP §27 | VERIFIED | Combat/entity health | combat + entity files | combat data | combat tests | TESTED |
| CMB-003 | Projectile, area effects, status effects and cooldowns | MBP §27 | VERIFIED | Combat/effects | combat/projectile/status systems | effect data | effect tests | IMPLEMENTED |
| ENY-001 | Enemy lifecycle SPAWNING→SEARCHING→MOVING→ATTACKING→HIT→DYING→DEAD | MBP §15 | VERIFIED | Enemy FSM | `src/scenes/GameplayScene.ts` | enemy definitions | lifecycle tests | IMPLEMENTED |
| ENY-002 | Target selection/reassignment and validity | MBP §15; ADD §78 | VERIFIED | Enemy AI | `src/scenes/GameplayScene.ts` | AI config | selection/reassignment tests | IMPLEMENTED |
| ENY-003 | Path movement, attack cooldown, damage and death | MBP §15 | VERIFIED | Enemy AI/combat | AI/combat | enemy data | AI combat integration test | IMPLEMENTED |
| ENY-004 | Exact enemy roster and statistics | MBP §§6,15 | UNKNOWN | Enemy content | enemies JSON | P2/P3/P7 missing | reference data audit | BLOCKED |
| HNT-001 | Hunter FSM with documented states | MBP §14 | VERIFIED | Hunter AI | `src/scenes/GameplayScene.ts` | hunter definitions | hunter-state tests | IMPLEMENTED |
| HNT-002 | Pursue player, room/door/survivor targets via navigation | MBP §14 | VERIFIED | Hunter AI/pathfinding | hunter/path systems | level/hunter data | pursuit/door-target tests | IMPLEMENTED |
| HNT-003 | Difficulty/wave-aware skills and behavior | MBP §14 | VERIFIED/UNKNOWN | Hunter AI/difficulty | hunter/difficulty systems | P7 missing | difficulty behavior tests | PLANNED |
| HNT-004 | Exact hunter skills/statistics | MBP §§7,14 | UNKNOWN | Hunter data | hunters JSON | P2/P3/P7 missing | reference data audit | BLOCKED |
| BOS-001 | Boss health/damage/movement/target/attack/state/death | MBP §24 | VERIFIED | Boss entity/AI | `src/scenes/GameplayScene.ts` | bosses JSON | boss lifecycle/combat tests | IMPLEMENTED |
| BOS-002 | Boss special behavior and reward/result | MBP §24 | VERIFIED/UNKNOWN | Boss system | same as BOS-001 | P2/P3/P7 missing | boss-wave E2E | IMPLEMENTED |
| BOS-003 | Exact boss roster/statistics/skills | MBP §24 | UNKNOWN | Boss data | bosses JSON | P2/P3/P7 missing | reference data audit | BLOCKED |
| WAV-001 | Wave scheduler spawns definitions over elapsed time | MBP §25 | VERIFIED | Wave system | `src/scenes/GameplayScene.ts` | waves JSON | spawn schedule tests | IMPLEMENTED |
| WAV-002 | Completion requires spawn exhausted + no active enemies | MBP §25 | VERIFIED | Wave system | same as WAV-001 | runtime state | completion tests | IMPLEMENTED |
| WAV-003 | Next-wave transitions, boss waves, final victory | MBP §§25,44 | VERIFIED | Wave/state machine | wave/state systems | waves JSON | next/boss/victory tests | IMPLEMENTED |
| WAV-004 | Exact wave counts/composition/timing | MBP §§7,25 | UNKNOWN | Wave data | waves JSON | P2/P3/P7 missing | reference data audit | BLOCKED |
| DIF-001 | Centralized mode/global difficulty modifiers | MBP §26 | VERIFIED | Difficulty system | `src/scenes/GameplayScene.ts` | modes JSON | modifier tests | IMPLEMENTED |
| DIF-002 | Affect appropriate strength/composition/pressure/hunter/boss knobs only | MBP §26 | VERIFIED | Difficulty consumers | AI/wave/combat systems | modes JSON | scoped modifier tests | IMPLEMENTED |
| ALY-001 | NPC survivor alive/attack/room/door/defense/death tracking | MBP §16 | VERIFIED | Ally system | `src/scenes/GameplayScene.ts` | ally/room data | ally lifecycle tests | IMPLEMENTED |
| ALY-002 | Ally autonomous contribution/defense | MBP §§2,16 | VERIFIED/UNKNOWN | Ally AI | `AllySystem.ts` | P7 missing | ally combat E2E | IMPLEMENTED |
| ALY-003 | Ally loss updates centralized difficulty when applicable | MBP §16 | VERIFIED/UNKNOWN | Ally/difficulty | ally + difficulty systems | P7 missing | ally-loss modifier test | IMPLEMENTED |
| TUT-001 | State-aware move→find→claim→sleep/generate→build→upgrade→defend flow | MBP §30 | VERIFIED | Tutorial system/scene | `src/scenes/TutorialScene.ts`, `src/scenes/GameplayScene.ts` | tutorial steps JSON | full tutorial E2E | IMPLEMENTED |
| TUT-002 | Advance only on actual matching events | MBP §30 | VERIFIED | Tutorial/event bus | `TutorialSystem.ts` | event contracts | false/true advancement tests | IMPLEMENTED |
| TUT-003 | Replay/restart safely | MBP §30 | VERIFIED | Tutorial/state reset | tutorial/state systems | tutorial data | tutorial restart test | PLANNED |
| UI-001 | HUD reflects authoritative gold/wave/door/bed/build/room/enemy/player state | MBP §28; ADD §64 | VERIFIED | HUD | `src/scenes/GameplayScene.ts` | GameState selectors | HUD consistency tests | IMPLEMENTED |
| UI-002 | Functional build/upgrade/repair controls | MBP §28 | VERIFIED | Gameplay UI | `src/scenes/GameplayScene.ts` | definitions/state | button integration tests | IMPLEMENTED |
| UI-003 | Pause/resume, victory, defeat and restart UI | MBP §28 | VERIFIED | Overlay/end scenes | `src/scenes/GameplayScene.ts` | state machine | UI E2E tests | IMPLEMENTED |
| UI-004 | Hover/press/disabled/selected/focus/feedback/transitions/errors | MBP §29 | VERIFIED | UI components | `src/ui/Button.ts` | theme data | interaction-state tests | IMPLEMENTED |
| UI-005 | Input debounce prevents touch+click and repeated action | ADD §§71,83 | VERIFIED | Common input/UI | input manager/components | debounce config | duplicate-event test | IMPLEMENTED |
| UI-006 | Accessible contrast/readability/keyboard/mute/reduced motion | ADD §90 | VERIFIED | Theme/UI/settings | UI files/styles | settings/theme | accessibility review/tests | IMPLEMENTED |
| INP-001 | Common abstraction for keyboard/mouse/touch | MBP §§32–33; ADD §71 | VERIFIED | Input manager | `src/scenes/GameplayScene.ts` | key binding config | input mapping tests | IMPLEMENTED |
| INP-002 | WASD, arrows, mouse interaction, shortcuts, Escape | MBP §32 | VERIFIED | Desktop input | input manager | bindings config | desktop input E2E | IMPLEMENTED |
| INP-003 | Virtual joystick + touch actions/build/upgrade/pause | MBP §33 | VERIFIED | Touch controls | `src/scenes/GameplayScene.ts` | touch config | synthetic touch tests | IMPLEMENTED |
| INP-004 | touchstart/move/end/cancel, safe areas, gesture prevention | ADD §70 | VERIFIED | Touch controls/CSS | touch input + styles | CSS/config | cancellation/orientation tests | IMPLEMENTED |
| INP-005 | Portrait/landscape/tablet responsive controls | MBP §33 | VERIFIED | Responsive UI | `src/main.ts`, `src/style.css` | breakpoints config | viewport matrix test | IMPLEMENTED |
| AUD-001 | Event-based audio hooks for documented game events | MBP §36 | VERIFIED | Audio system | `src/systems/AudioSystem.ts` | audio event map | event dispatch tests | IMPLEMENTED |
| AUD-002 | User-gesture AudioContext unlock; safe failure | ADD §69 | VERIFIED | Audio lifecycle | audio system | settings | blocked-audio test | IMPLEMENTED |
| AUD-003 | Original/licensed coherent audio assets | MBP §§36,39 | UNKNOWN | Asset production | `public/assets/audio/` | no supplied assets | asset/license audit | BLOCKED |
| VFX-001 | Damage/projectile/impact/electric/door/build/upgrade/death/boss/end feedback | MBP §37 | VERIFIED | VFX system | `src/scenes/GameplayScene.ts` | VFX definitions | emitted/effect pool tests | IMPLEMENTED |
| VFX-002 | Pool temporary particles/damage numbers/effects | MBP §37; ADD §77 | VERIFIED | Object pools | `src/vfx/*Pool.ts` | VFX config | pool reuse tests | PLANNED |
| ART-001 | Original coherent stylized cartoon-horror nighttime visuals | MBP §§38–39 | VERIFIED | Procedural/original assets | `public/assets/visual/` | original assets | visual QA | IMPLEMENTED |
| ART-002 | Exact composition/proportion/layout comparison | MBP §46; ADD §§117–118 | UNKNOWN | Visual QA | requirements comparison notes | missing references | comparison audit | BLOCKED |
| ANI-001 | Player/enemy/building animation-state mapping | MBP §35 | VERIFIED | Animation system | `src/scenes/GameplayScene.ts` | animations JSON | mapping/fallback tests | IMPLEMENTED |
| ANI-002 | Missing animation safe fallback | MBP §41 | VERIFIED | Animation system | same as ANI-001 | manifest | missing-animation test | IMPLEMENTED |
| SAV-001 | Versioned localStorage save with migrations | MBP §31; ADD §§66–67 | VERIFIED | Save system | `src/systems/SaveSystem.ts` | save schema | save/load/migration tests | TESTED |
| SAV-002 | Save progression/unlocks/completions/settings/persistent upgrades | MBP §31 | VERIFIED | Save DTO/selectors | save system/types | progression schema | round-trip test | IMPLEMENTED |
| SAV-003 | Detect corrupt/untrusted data, sanitize or safe defaults | MBP §31; ADD §§96–97 | VERIFIED | Save validator/recovery | save system | save schema | corruption/clamp tests | TESTED |
| SAV-004 | Autosave/manual/transition/page lifecycle saves | ADD §67 | VERIFIED | Save coordinator | save/browser lifecycle systems | save policy | lifecycle save test | IMPLEMENTED |
| BRW-001 | Pause/reconcile on visibility/pagehide/blur | ADD §§68,92 | VERIFIED | Browser lifecycle | `src/scenes/GameplayScene.ts` | pause policy | visibility tests | IMPLEMENTED |
| BRW-002 | Resize/orientation/fullscreen/focus handling | ADD §68 | VERIFIED | Browser lifecycle/layout | same as BRW-001 | display config | event tests | IMPLEMENTED |
| BRW-003 | No hidden-tab resource/wave/cooldown jump | ADD §68 | VERIFIED | Simulation/pause | simulation/lifecycle | max delta config | hidden-time test | IMPLEMENTED |
| PAU-001 | Pause freezes simulation, AI, combat, economy, waves, projectiles | ADD §91 | VERIFIED | Pause/state/simulation | game state/simulation | pause semantics | subsystem freeze test | IMPLEMENTED |
| RST-001 | Restart resets all transient entities/timers/state/UI/camera | ADD §84 | VERIFIED | Session factory/reset | `src/core/GameSession.ts`, `src/scenes/GameplayScene.ts` | initial game data | clean-restart test | IMPLEMENTED |
| SCN-001 | Safe transitions clean listeners/timers/tweens/entities/audio | ADD §§76,85 | VERIFIED | Scene lifecycle | `src/scenes/GameplayScene.ts` | lifecycle policy | repeated-transition leak test | IMPLEMENTED |
| END-001 | Victory reachable from real wave/boss state | MBP §§2,25,45 | VERIFIED | Wave/state/victory scene | wave/state/end scenes | waves/modes | victory E2E | IMPLEMENTED |
| END-002 | Defeat reachable from player death/room failure | MBP §§2,10,19,45 | VERIFIED | Combat/room/state/defeat scene | systems/end scene | combat data | defeat E2E | IMPLEMENTED |
| END-003 | Restart and return to menu | MBP §2, §28 | VERIFIED | End UI/state reset | end scenes/session | N/A | end navigation E2E | IMPLEMENTED |
| DBG-001 | Development overlay: FPS/coords/states/wave/entities/gold/HP/AI/path/collision/cells/camera/save | ADD §87 | VERIFIED | Debug overlay | `src/scenes/GameplayScene.ts` | debug selectors | toggle/content test | IMPLEMENTED |
| DBG-002 | Debug disabled in production | ADD §§87,102–103,106 | VERIFIED | Feature flags/build | features/debug | build mode | production scan | IMPLEMENTED |
| ERR-001 | Safe recovery for invalid data/assets/targets/paths/scenes/resize | MBP §41; ADD §101 | VERIFIED | Error boundary/recovery UI | `src/systems/SaveSystem.ts`, `src/scenes/BootScene.ts` | error catalog | fault-injection tests | IMPLEMENTED |
| ERR-002 | Meaningful logging, no empty catches, no production spam | MBP §§41,43; ADD §106 | VERIFIED | Logger | Native error reporting and release audit | environment config | lint/console scan | IMPLEMENTED |
| PER-001 | Desktop 60 FPS target/mobile stable | MBP §40; ADD §115 | VERIFIED | Performance monitor/optimization | simulation/pools/debug | budgets config | heavy-wave benchmark | PLANNED |
| PER-002 | DPR cap and uniform responsive scaling | ADD §§72–73 | VERIFIED | Phaser scale config | `src/main.ts` | display config | viewport/DPR tests | IMPLEMENTED |
| PER-003 | AI path recalculation interval/budget | ADD §78 | VERIFIED | AI/pathfinding | path/AI systems | AI performance config | many-enemy benchmark | IMPLEMENTED |
| PER-004 | Cleanup and no runtime leaks over repeated sessions | ADD §§76,84–85 | VERIFIED | Lifecycle/disposal | all systems/scenes | N/A | restart soak test | PLANNED |
| QA-001 | Unit tests: player/room/economy/build/combat/AI/waves/save/UI | MBP §44 | VERIFIED | Vitest suite | `src/tests/**/*.test.ts` | test fixtures | `npm test` | TESTED |
| QA-002 | Full acceptance flow executed | MBP §45 | VERIFIED | E2E/manual test | `tests/e2e/*`, QA report | production data | acceptance test | PLANNED |
| QA-003 | Desktop browser/input/resize/fullscreen matrix | MBP §49; ADD §114 | VERIFIED | Browser QA | `docs/qa-report.md` | build | desktop matrix | PLANNED |
| QA-004 | Mobile portrait/landscape/touch/lifecycle/performance matrix | MBP §48; ADD §114 | VERIFIED | Mobile QA | `docs/qa-report.md` | build | mobile matrix | PLANNED |
| QA-005 | Soft-lock/exploit/path/save/restart/transition regression | MBP §47 | VERIFIED | Regression suite | unit/E2E tests | fixtures | regression suite | PLANNED |
| QA-006 | New/returning/corrupt/slow/large-wave/long-session playtests | ADD §114 | VERIFIED | Playtest plan | `docs/qa-report.md` | fixtures | playtest matrix | PLANNED |
| QA-007 | Scan TODO/FIXME/placeholder/debug/missing/empty handlers | ADD §§104–106 | VERIFIED | Release audit script | `scripts/release-audit.ts` | repository | `npm run release-audit` | PLANNED |
| DOC-001 | README install/dev/build/architecture/data/controls/tests/deploy/unknowns | MBP §55 | VERIFIED | Documentation | `README.md` | project | doc review | IMPLEMENTED |
| DOC-002 | Reference vs web behavior ledger (MATCH/PARTIAL/WEB_ADAPTATION/UNKNOWN) | ADD §§60,118 | VERIFIED | Traceability docs | `requirements/reference-comparison.md` | research + implementation | comparison review | PLANNED |
| DOC-003 | Honest final completion report and status table | MBP §56; ADD §§119–121 | VERIFIED | Release report | `docs/release-report.md` | test/build evidence | release gate review | PLANNED |

## Initial blockers and handling

1. **All named reference research is absent.** Exact values, roster, map geometry, visual comparisons, sound inventory, and verified runtime nuances are BLOCKED rather than guessed.
2. Implementation may proceed only with values explicitly categorized in data as `WEB_ADAPTATION` or `UNKNOWN`, never masquerading as reference values.
3. When research files arrive, data-source citations and evidence labels must be updated before reconciling implementation data.
4. “Fully faithful to the reference” cannot be validated until those sources are available; browser engineering and the explicitly required acceptance flow can still be implemented and tested.
