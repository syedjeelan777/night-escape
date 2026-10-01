export interface Cell{x:number;y:number} export type Algorithm='ASTAR'|'BFS'|'DIJKSTRA'|'FALLBACK';
const key=(c:Cell)=>`${c.x},${c.y}`;
export class PathfindingSystem{
 constructor(readonly width:number,readonly height:number,private blocked:Set<string>=new Set()){}
 setBlocked(cell:Cell,value:boolean){value?this.blocked.add(key(cell)):this.blocked.delete(key(cell))}
 isWalkable(c:Cell){return c.x>=0&&c.y>=0&&c.x<this.width&&c.y<this.height&&!this.blocked.has(key(c))}
 find(start:Cell,goal:Cell,algorithm:Algorithm='ASTAR',maxNodes=3000):Cell[]{if(!this.isWalkable(start)||!this.isWalkable(goal))return[];if(algorithm==='FALLBACK')return this.line(start,goal);const queue:[Cell,number][]=[[start,0]],came=new Map<string,Cell>(),cost=new Map([[key(start),0]]);let visited=0;while(queue.length&&visited++<maxNodes){queue.sort((a,b)=>a[1]-b[1]);const[current]=queue.shift()!;if(key(current)===key(goal))return this.reconstruct(came,start,goal);for(const n of this.neighbors(current)){const nc=(cost.get(key(current))??0)+1;if(nc<(cost.get(key(n))??Infinity)){cost.set(key(n),nc);came.set(key(n),current);const h=algorithm==='ASTAR'?Math.abs(goal.x-n.x)+Math.abs(goal.y-n.y):0;queue.push([n,nc+h])}}}return[]}
 private neighbors(c:Cell){return[{x:c.x+1,y:c.y},{x:c.x-1,y:c.y},{x:c.x,y:c.y+1},{x:c.x,y:c.y-1}].filter(n=>this.isWalkable(n))}
 private reconstruct(came:Map<string,Cell>,start:Cell,goal:Cell){const path=[goal];let cur=goal;while(key(cur)!==key(start)){const prev=came.get(key(cur));if(!prev)return[];path.push(prev);cur=prev}return path.reverse()}
 private line(start:Cell,goal:Cell){const out=[start];let cur={...start};let safety=this.width+this.height;while((cur.x!==goal.x||cur.y!==goal.y)&&safety-->0){const next={x:cur.x+Math.sign(goal.x-cur.x),y:cur.y};if(!this.isWalkable(next)){next.x=cur.x;next.y+=Math.sign(goal.y-cur.y)}if(!this.isWalkable(next))return[];out.push(next);cur=next}return out}
}
