import type { GamePhase } from '../types/game';
const TRANSITIONS: Record<GamePhase, readonly GamePhase[]> = {
 BOOT:['LOADING'],LOADING:['MAIN_MENU'],MAIN_MENU:['TUTORIAL','MODE_SELECTION'],TUTORIAL:['MODE_SELECTION','MAIN_MENU'],MODE_SELECTION:['ROOM_SELECTION','ESCAPE_PHASE','MAIN_MENU'],ROOM_SELECTION:['ESCAPE_PHASE','MAIN_MENU'],ESCAPE_PHASE:['ROOM_CLAIMED','PLAYER_DEAD','DEFEAT','PAUSED','MAIN_MENU'],ROOM_CLAIMED:['DEFENSE_SETUP','PAUSED'],DEFENSE_SETUP:['WAVE_ACTIVE','PAUSED','MAIN_MENU'],WAVE_ACTIVE:['WAVE_COMPLETE','PLAYER_DEAD','ROOM_BREACHED','VICTORY','PAUSED'],WAVE_COMPLETE:['DEFENSE_SETUP','VICTORY','PAUSED'],PLAYER_DEAD:['DEFEAT','RESTARTING'],ROOM_BREACHED:['DEFEAT','RESTARTING'],VICTORY:['RESTARTING','MAIN_MENU'],DEFEAT:['RESTARTING','MAIN_MENU'],PAUSED:['ESCAPE_PHASE','DEFENSE_SETUP','WAVE_ACTIVE','WAVE_COMPLETE','MAIN_MENU'],RESTARTING:['ESCAPE_PHASE','MAIN_MENU']
};
export class GameStateMachine {
 constructor(private current:GamePhase='BOOT'){}
 get state(){return this.current}
 can(next:GamePhase){return TRANSITIONS[this.current].includes(next)}
 transition(next:GamePhase){if(!this.can(next)) return false;this.current=next;return true}
 force(next:GamePhase){this.current=next}
}
