// =========================================================================================
//      S p a c e   I n v a d e r s   c l o n
//  
//      By Juan Eguia 
// 
// -----------------------------------------------------------------------------------------
import { Scene } from 'phaser';
import { Settings } from './settings.js';

import { 
  play_sonidos
} from '../functions/functions.js';

import { Jugador, JugadorShowVidas } from '../components/jugador.js';
import { Disparo } from '../components/disparo.js';
import { Enemigo } from './../components/enemigos2.js';
import { DisparoEnemigo } from '../components/disparo-ene.js';
import { Explosion } from '../components/explosion.js';
import { Particulas } from '../components/particulas.js';
import { Marcador } from './../components/marcador.js';
import { BotonFullScreen } from '../components/boton-nuevapartida.js';
import { BotonFire, CrucetaDireccion } from '../components/botonfire.js';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    init()
    {
        Settings.setNivelSuperado(false);

        this.jugador = new Jugador(this);
        this.jugadorSV = new JugadorShowVidas(this);
        this.disparo = new Disparo(this);

        this.enemigo = new Enemigo(this, {
            left: 0,
            vx: 0,
            vy: 1,
            each: 20,
            numberAliensHor: 10,
            numberAliensVer: 6,
            gapX: 64,
            gapY: 48,
            marginLeft: 96,
            marginTop: 64
        });

        this.disparoenemigo = new DisparoEnemigo(this);
        this.explosion = new Explosion(this);
        this.particulas = new Particulas(this);
        this.marcador = new Marcador(this);

        this.botonfullscreen = new BotonFullScreen(this, {
            x: this.sys.game.config.width / 1.1, y: 0,
            id: 'boton-fullscreen',
            scX: 1, scY: 1, ang: 0
        });

        this.botonfire = new BotonFire(this);
        this.crucetaleft = new CrucetaDireccion(this, { id: 'cruceta-left', x: 80, y: 60 });
        this.crucetaright = new CrucetaDireccion(this, { id: 'cruceta-right', x: 290, y: 60 });
        // var joyStick = scene.plugins.get('rexvirtualjoystickplugin').addPlayer(scene, config);
    }

    preload() {}

    create ()
    {
        this.add.image(0, 0, 'fondo').setOrigin(0, 0);

        this.set_sonidos();

        this.botonfullscreen.create();
        // this.botonfire.create();
        // this.crucetaleft.create();
        // this.crucetaright.create();
        // this.hideMobileControls();

        /* this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 90,
        y: this.sys.game.config.height - 90,
        radius: 100,
        // base: this.add.circle(0, 0, 50, 0x888888),
        base: this.add.image(0, 0, 'base-joystick').setScale(2),
        // thumb: this.add.circle(0, 0, 25, 0xcccccc),
        thumb: this.add.image(0, 0, 'base-joystick').setScale(1)
        }); */
        
        this.jugadorSV.create();
        this.jugador.create();
        // this.disparo.create();
        this.enemigo.create();
        // this.disparoenemigo.create();
        // this.explosion.create();
        // this.particulas.create();
        // this.marcador.create();

        this.set_colliders();
    }

    update()
    {
        this.jugador.update();
        this.enemigo.update();
    }

    set_sonidos()
    {
        this.sonidoDisparo = this.sound.add('disparo-jugador');
        this.sonidoDisparoEnemigo = this.sound.add('disparo-enemigo');
        this.sonidoAliensAtmos = this.sound.add('aliens-atmos');
        this.sonidoAliensHere = this.sound.add('aliens-here');
    }

    hideMobileControls()
    {
        console.log(Settings.controlElegido);
        
        if (!Settings.controlElegido.mobile)
        {
        this.botonfire.get().setVisible(false);
        this.crucetaleft.get().setVisible(false);
        this.crucetaright.get().setVisible(false);
        }
    }

    set_colliders()
    {
        /* this.physics.add.collider(this.enemigo.get(), this.disparo.get(), colisionVsEnemigo, null, this);

        this.physics.add.overlap(this.enemigo.get(), this.jugador.get(), colisionJugadorVsEnemigo,(enemigo, jugador) => {

        if (enemigo.alpha < 1) return false;// Invisibilidad al revivir
        return true;
        }, this);

        this.physics.add.overlap(this.disparoenemigo.get(), this.jugador.get(), colisionVsDisparoEnemigo,(disparoenemigo, jugador) => {

        if (disparoenemigo.alpha < 1) return false;// Invisibilidad al revivir
        return true;
        }, this); */
    }
}
