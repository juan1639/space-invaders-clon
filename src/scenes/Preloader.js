import { Scene } from 'phaser';
import { Textos } from '../components/textos.js';

export class Preloader extends Scene
{
    constructor()
    {
        super('Preloader');
    }

    init()
    {
        const widthScreen = this.sys.game.config.width;
        const heightScreen = this.sys.game.config.height;

        this.load.image('fondo', 'assets/img/fondo-nebulosa-800x600.png');
        this.add.image(0, 0, 'fondo').setOrigin(0, 0);

        this.txt = new Textos(this, {
            x: Math.floor(widthScreen / 2),
            y: Math.floor(heightScreen / 3.5),
            txt: ' Loading...',
            size: 55, color: '#ffa', style: 'bold',
            stroke: '#f91', sizeStroke: 16,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0.5, 0.5],
            elastic: false, dura: 0
        });

        this.txt.create();

        this.add.rectangle(
            Math.floor(widthScreen / 2), Math.floor(heightScreen / 2),
            Math.floor(widthScreen / 1.5), Math.floor(heightScreen / 12)
        ).setStrokeStyle(1, 0xffee88);

        const bar = this.add.rectangle(
            Math.floor(widthScreen / 2) - Math.floor(widthScreen / 3) + 4,
            Math.floor(heightScreen / 2),
            4,
            Math.floor(heightScreen / 14),
            0xff9911
        );

        this.load.on('progress', (progress) => {
            bar.width = (Math.floor(widthScreen / 1.52) * progress);
        });
    } 
    
    preload()
    {
        this.load.setPath('assets');

        this.load.image('fondo-nebulosa', './img/fondo-nebulosa-800x600.png');
        this.load.image('ufos-img', './img/ufos-img.png');

        this.load.image('boton-nueva-partida', './img/boton-start.png');
        this.load.spritesheet('boton-fullscreen', './img/boton-fullscreen.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('radio-buttons', './img/radio-buttons-ssheet.png', {frameWidth: 50, frameHeight: 50});

        this.load.image('boton-fire-joystick', './img/boton-fire-joystick.png');
        this.load.image('cruceta-left', './img/left.png');
        this.load.image('cruceta-right', './img/right.png');

        this.load.image('explosion', './img/boom.png');
        this.load.image('disparo-ene', './img/disparo-invader.png');
        this.load.image('disparo', './img/bullet2.png');
        this.load.image('explosion-obstaculo', './img/explode.png');
        this.load.image('particula-tint', './img/particula-tint.png');
        this.load.image('nodriza', './img/mothership.png');
        this.load.spritesheet('nodriza-ssheet', './img/mothership-ssheet.png', {frameWidth: 48, frameHeight: 21});
        this.load.image('jugador', './img/ship.png');

        const widthInvader = [null, 16, 22, 24];

        for (let i = 1; i < 4; i ++)
        {
            this.load.spritesheet(`invader${i}`, `./img/invader${i}.png`, {
                frameWidth: widthInvader[i], frameHeight: 16
            });
        }

        //  Archivos de audio
        this.load.audio('disparo-jugador', './disparo-corto.mp3');
        this.load.audio('disparo-enemigo', './disparo-enemigo.mp3');
        this.load.audio('aliens-atmos', './alien-atmos-dark.mp3');
        this.load.audio('aliens-here', './invaders-are-here.mp3');
        this.load.audio('explosion', './explosion.wav');
        this.load.audio('nave-explota', './navexplota.mp3');
        this.load.audio('gameover-retro', './game-over-arcade-retro.mp3');
        this.load.audio('bonus-nodriza', './level-passed.mp3');
    }

    create()
    {
        this.scene.start('MainMenu');
    }
}
