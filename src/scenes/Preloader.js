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

        this.load.image('fondo', 'assets/img/fondo-nebulosa-800x600.png');
        this.add.image(0, 0, 'fondo').setOrigin(0, 0);
    } 
    
    preload()
    {
        this.load.setPath('assets');

        this.load.image('fondo-nebulosa', './img/fondo-nebulosa-800x600.png');
        this.load.image('ufos-img', './img/ufos-img.png');

        this.load.image('boton-nueva-partida', './img/boton-start.png');
        this.load.spritesheet('boton-fullscreen', './img/boton-fullscreen.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('radio-buttons', './img/radio-buttons-ssheet.png', {frameWidth: 50, frameHeight: 50});

        this.load.image('explosion', './img/boom.png');
        this.load.image('disparo-ene', './img/bullet.png');
        this.load.image('disparo', './img/bullet2.png');
        this.load.image('explosion-obstaculo', './img/explode.png');
        this.load.image('nodriza', './img/mothership.png');
        this.load.image('jugador', './img/ship.png');

        for (let i = 1; i < 4; i ++)
        {
            this.load.spritesheet(`invader${i}`, `./img/invader${i}.png`, {frameWidth: 16, frameHeight: 16});
        }

        //  Archivos de audio
        this.load.audio('disparo-jugador', './disparo-corto.mp3');
        this.load.audio('disparo-enemigo', './disparo-enemigo.mp3');
        this.load.audio('aliens-atmos', './alien-atmos-dark.mp3');
        this.load.audio('aliens-here', './invaders-are-here.mp3');
    }

    create()
    {
        this.scene.start('MainMenu');
    }
}
