export type GamePhase = 'BOOT'|'LOADING'|'MAIN_MENU'|'TUTORIAL'|'MODE_SELECTION'|'ROOM_SELECTION'|'ESCAPE_PHASE'|'ROOM_CLAIMED'|'DEFENSE_SETUP'|'WAVE_ACTIVE'|'WAVE_COMPLETE'|'PLAYER_DEAD'|'ROOM_BREACHED'|'VICTORY'|'DEFEAT'|'PAUSED'|'RESTARTING';
export type RoomLifecycle = 'EMPTY'|'CLAIMED'|'LOCKED'|'DEFENDING'|'BREACHED'|'DEFEATED';
export type PlayerState = 'IDLE'|'MOVING'|'INTERACTING'|'SLEEPING'|'BUILDING'|'REPAIRING'|'HIT'|'DEAD';
export type EnemyState = 'SPAWNING'|'SEARCHING'|'MOVING'|'ATTACKING'|'HIT'|'DYING'|'DEAD';
export type Evidence = 'VERIFIED'|'OBSERVED'|'EXTRACTED'|'INFERRED'|'UNKNOWN'|'WEB_ADAPTATION';
export interface RoomDefinition { id:string; name:string; x:number;y:number;width:number;height:number;doorX:number;doorY:number;bedX:number;bedY:number;buildSlots:[number,number][] }
export interface LevelSpec { level:number; maxHealth:number; upgradeCost:number|null }
export interface BedLevel { level:number; goldPerSecond:number; upgradeCost:number|null }
export interface BuildingDefinition { id:string;name:string;kind:'TURRET'|'TESLA'|'MINE'|'RADAR';cost:number;color:number;damage:number;range:number;cooldownMs:number;upgradeCost:number }
export interface EnemyDefinition { id:string;name:string;maxHealth:number;speed:number;damage:number;attackRange:number;attackCooldownMs:number;reward:number;color:number }
export interface WaveDefinition { id:number; groups:{enemyId:string;count:number;spawnIntervalMs:number}[]; boss?:string }
export interface ModeDefinition { id:string;name:string;enemyHealth:number;enemyDamage:number;enemySpeed:number;reward:number }
export interface GameData { schemaVersion:number;evidence:Evidence;note:string;world:{width:number;height:number;cellSize:number;simulationStepMs:number;maxFrameDeltaMs:number};player:{maxHealth:number;speed:number;interactRange:number};hunter:{maxHealth:number;speed:number;escapeDamage:number;attackRange:number;attackCooldownMs:number};economy:{startingGold:number;repairCost:number;repairAmount:number};rooms:RoomDefinition[];doorLevels:LevelSpec[];bedLevels:BedLevel[];buildings:BuildingDefinition[];enemies:EnemyDefinition[];waves:WaveDefinition[];modes:ModeDefinition[] }
export interface RoomState { id:string;lifecycle:RoomLifecycle;owner:'PLAYER'|'ALLY'|null;doorLevel:number;doorHealth:number;bedLevel:number;buildings:(BuildingState|null)[] }
export interface BuildingState { definitionId:string;level:number;cooldownRemaining:number;active:boolean }
export interface SessionState { phase:GamePhase;previousPhase:GamePhase|null;modeId:string;gold:number;wave:number;playerHealth:number;claimedRoomId:string|null;rooms:RoomState[];elapsedMs:number;seed:number;tutorial:boolean }
export interface SaveData { saveVersion:number;settings:{muted:boolean;reducedMotion:boolean};progression:{wins:number;losses:number;unlockedModes:string[]};lastMode:string }
