import Phaser from 'phaser';
export class BootScene extends Phaser.Scene{constructor(){super('Boot')}create(){this.scene.start('Preload')}}
export class PreloadScene extends Phaser.Scene{constructor(){super('Preload')}create(){this.add.text(640,330,'Lanterns lit. Ready.',{fontFamily:'Nunito',fontSize:'25px',color:'#dce3ff'}).setOrigin(.5);this.add.rectangle(390,375,500,12,0xf4d35e).setOrigin(0,.5);this.time.delayedCall(80,()=>this.scene.start('Menu'))}}
