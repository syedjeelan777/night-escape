import type { GameEventBus } from './GameEventBus';
export class EconomySystem{
 private pending=new Set<string>();
 constructor(private getGold:()=>number,private setGold:(value:number)=>void,private events?:GameEventBus){}
 earn(amount:number){if(!Number.isFinite(amount)||amount<=0)return false;const next=Math.min(999999,Math.floor(this.getGold()+amount));this.setGold(next);this.events?.emit('GOLD_CHANGED',{gold:next,delta:amount});return true}
 purchase(transactionId:string,cost:number,execute:()=>boolean){if(this.pending.has(transactionId)||!Number.isFinite(cost)||cost<0||this.getGold()<cost)return false;this.pending.add(transactionId);try{if(!execute())return false;const next=Math.max(0,this.getGold()-cost);this.setGold(next);this.events?.emit('GOLD_CHANGED',{gold:next,delta:-cost});return true}finally{this.pending.delete(transactionId)}}
}
