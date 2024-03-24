import { Scene } from 'phaser';
import { Textos } from '../components/textos.js';
import { play_sonidos } from '../functions/functions.js';
import { BotonNuevaPartida } from '../components/boton-nuevapartida.js';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    init()
    {
        this.botoninicio = new BotonNuevaPartida(this);

        this.txt = new Textos(this, {
            x: Math.floor(this.sys.game.config.width / 2),
            y: 0,
            txt: ' Retro Aliens ',
            size: 100, color: '#ffa', style: 'bold',
            stroke: '#1ca', sizeStroke: 16,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0.5, 0.5],
            elastic: Math.floor(this.sys.game.config.height / 4), dura: 3000
        });
    }

    preload() {}

    create ()
    {
        this.sonidoAliensAtmos = this.sound.add('aliens-atmos');

        const aparecerBoton = 1800; // 1800

        this.add.image(0, 0, 'fondo').setOrigin(0, 0);

        this.ovnis = this.add.image(
            this.sys.game.config.width / 2, this.sys.game.config.height / 1.6, 'ufos-img'
        );

        this.txt.create();

        this.tweens.add({
            targets: this.ovnis,
            scale: 0,
            duration: 59000
        });

        this.add.timeline([
            {
                at: aparecerBoton,
                run: () => {
                    this.botoninicio.create('Game', false);
                }
            }
        ]).play();

        play_sonidos(this.sonidoAliensAtmos, false, 0.9);

        console.log(this.txt);
    }  
}
