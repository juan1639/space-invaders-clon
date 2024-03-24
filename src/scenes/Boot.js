import { Scene } from 'phaser';
import { Textos } from "../components/textos.js";

export class Boot extends Scene
{
    constructor()
    {
        super('Boot');
    }

    init()
    {
        this.txt = new Textos(this, {
            x: Math.floor(this.sys.game.config.width / 2),
            y: Math.floor(this.sys.game.config.height / 2),
            txt: ' Touch screen or \n \n click to start... ',
            size: 60, color: '#ffa', style: 'bold',
            stroke: '#1e9', sizeStroke: 16,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0.5, 0.5],
            elastic: false, dura: 0
        });
    }

    preload()
    {
        this.load.image('fondo', 'assets/img/fondo-nebulosa-800x600.png');
    }

    create()
    {
        this.add.image(0, 0, 'fondo').setOrigin(0, 0);
        this.txt.create();

        this.input.on('pointerdown', () => this.scene.start('Preloader'));

        console.log(this.txt);
    }
}
