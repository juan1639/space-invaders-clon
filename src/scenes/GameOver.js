import { Scene } from 'phaser';
import { Settings } from './settings.js';
import { ElegirControles, BotonNuevaPartida } from '../components/boton-nuevapartida';

export class GameOver extends Scene
{
    constructor ()
    {
        super('PreGame');
    }

    init()
    {
        Settings.setPuntos(0);
        Settings.setNivel(1);
        Settings.setVidas(3);
        Settings.setGameOver(false);
        Settings.setNivelSuperado(false);
        Settings.explosionInvaders = null;
        Settings.showBonus = null;
        Settings.controlElegido.mobile = false;
        Settings.controlElegido.teclado = true;
        
        this.botoninicio = new BotonNuevaPartida(this);
        this.radiobuttons = [];

        this.radiobuttons.push(new ElegirControles(this, {
            left: Math.floor(this.sys.game.config.width / 15),
            top: Math.floor(this.sys.game.config.height / 4),
            frame: 1, scale: 1, texto: ' Keyboard cursors ', id: 'teclado'
        }));

        this.radiobuttons.push(new ElegirControles(this, {
            left: Math.floor(this.sys.game.config.width / 15),
            top: Math.floor(this.sys.game.config.height / 2.6),
            frame: 0, scale: 1, texto: ' Mobile controls ', id: 'mobile'
        }));
    }

    create ()
    {
        this.add.image(0, 0, 'fondo').setOrigin(0, 0);
        
        this.radiobuttons.forEach(radiobutton => radiobutton.create());
        this.botoninicio.create('Game', false);
    }
}
