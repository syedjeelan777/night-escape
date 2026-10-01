export type GameEventMap={
 PHASE_CHANGED:{from:string;to:string}; GOLD_CHANGED:{gold:number;delta:number}; ROOM_CLAIMED:{roomId:string}; DOOR_DAMAGED:{roomId:string;amount:number;health:number}; DOOR_BROKEN:{roomId:string}; ITEM_BUILT:{id:string;slot:number}; ITEM_UPGRADED:{id:string;level:number}; ENEMY_SPAWNED:{id:string;type:string}; ENEMY_DIED:{id:string;type:string}; WAVE_STARTED:{wave:number}; WAVE_COMPLETED:{wave:number}; BOSS_SPAWNED:{id:string}; PLAYER_DIED:{}; GAME_WON:{}; GAME_LOST:{reason:string}; ERROR:{message:string}
};
type Handler<T>=(payload:T)=>void;
export class GameEventBus {
 private handlers=new Map<keyof GameEventMap,Set<Handler<never>>>();
 on<K extends keyof GameEventMap>(event:K,handler:Handler<GameEventMap[K]>){const set=this.handlers.get(event)??new Set();set.add(handler as Handler<never>);this.handlers.set(event,set);return()=>set.delete(handler as Handler<never>)}
 emit<K extends keyof GameEventMap>(event:K,payload:GameEventMap[K]){this.handlers.get(event)?.forEach(h=>h(payload as never))}
 clear(){this.handlers.clear()}
}
