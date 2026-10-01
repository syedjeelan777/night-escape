export interface Damageable{id:string;health:number;maxHealth:number;alive:boolean}
export interface DamageRequest{sourceId:string;target:Damageable;amount:number;multiplier?:number}
export interface DamageResult{applied:number;killed:boolean;remaining:number}
export class CombatSystem{
 damage(request:DamageRequest):DamageResult{const t=request.target;if(!t.alive||!Number.isFinite(request.amount)||request.amount<=0)return{applied:0,killed:false,remaining:t.health};const applied=Math.max(0,request.amount*(request.multiplier??1));t.health=Math.max(0,t.health-applied);if(t.health===0)t.alive=false;return{applied,killed:!t.alive,remaining:t.health}}
 heal(target:Damageable,amount:number){if(!target.alive||amount<=0||!Number.isFinite(amount))return 0;const before=target.health;target.health=Math.min(target.maxHealth,target.health+amount);return target.health-before}
}
