import type { SaveData } from '../types/game';
const KEY='night-escape-save';
export const DEFAULT_SAVE:SaveData={saveVersion:1,settings:{muted:false,reducedMotion:false},progression:{wins:0,losses:0,unlockedModes:['calm','normal']},lastMode:'normal'};
export class SaveSystem{
 load():SaveData{try{const raw=localStorage.getItem(KEY);if(!raw)return structuredClone(DEFAULT_SAVE);return this.sanitize(JSON.parse(raw) as unknown)}catch{return structuredClone(DEFAULT_SAVE)}}
 save(data:SaveData){try{localStorage.setItem(KEY,JSON.stringify(this.sanitize(data)));return true}catch{return false}}
 clear(){try{localStorage.removeItem(KEY)}catch{return false}return true}
 sanitize(value:unknown):SaveData{if(!value||typeof value!=='object')return structuredClone(DEFAULT_SAVE);const v=value as Partial<SaveData>;const wins=this.integer(v.progression?.wins,0,9999);const losses=this.integer(v.progression?.losses,0,9999);const modes=Array.isArray(v.progression?.unlockedModes)?v.progression.unlockedModes.filter((x):x is string=>['calm','normal','hard'].includes(String(x))):DEFAULT_SAVE.progression.unlockedModes;return{saveVersion:1,settings:{muted:Boolean(v.settings?.muted),reducedMotion:Boolean(v.settings?.reducedMotion)},progression:{wins,losses,unlockedModes:[...new Set(modes.length?modes:['calm'])]},lastMode:['calm','normal','hard'].includes(v.lastMode??'')?v.lastMode!:'normal'}}
 private integer(v:unknown,min:number,max:number){return typeof v==='number'&&Number.isFinite(v)?Math.min(max,Math.max(min,Math.floor(v))):min}
}
