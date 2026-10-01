export class RandomService{
 private state:number;
 constructor(public readonly seed:number){this.state=seed>>>0||0x6d2b79f5}
 next(){let t=this.state+=0x6d2b79f5;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}
 range(min:number,max:number){return min+(max-min)*this.next()}
 integer(min:number,max:number){return Math.floor(this.range(min,max+1))}
 chance(probability:number){return this.next()<probability}
 shuffle<T>(input:readonly T[]){const out=[...input];for(let i=out.length-1;i>0;i--){const j=this.integer(0,i);[out[i],out[j]]=[out[j]!,out[i]!]}return out}
}
