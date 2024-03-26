// =========================================================================================
//      S p a c e   I n v a d e r s   c l o n
//  
//      By Juan Eguia 
// 
// -----------------------------------------------------------------------------------------
import { Scene } from 'phaser';
import { Settings } from './settings.js';

import {
    inicia_disparo,
    inicia_disparo_enemigos,
    colisionJugadorVsEnemigo,
    excepcionJugadorVsEnemigo,
    colisionDisparoVsEnemigo,
    colisionDisparoEnemigoVsJugador,
    excepcionDisparoEnemigoVsJugador,
    colisionDisparoVsNodriza,
    colisionDisparoEnemigoVsDefensas,
    colisionDisparoVsDefensas,
    play_sonidos
} from '../functions/functions.js';

import { Jugador, JugadorShowVidas } from '../components/jugador.js';
import { Disparo } from '../components/disparo.js';
import { Enemigo } from './../components/enemigos2.js';
import { DisparoEnemigo } from '../components/disparo-ene.js';
import { Explosion } from '../components/explosion.js';
import { Particulas } from '../components/particulas.js';
import { Marcador } from './../components/marcador.js';
import { Textos } from '../components/textos.js';
import { BotonFullScreen } from '../components/boton-nuevapartida.js';
import { BotonFire, CrucetaDireccion } from '../components/botonfire.js';
import { NaveNodriza } from '../components/nodriza.js';
import { Defensas } from '../components/defensas.js';

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
            left: 96,
            top: 64,
            vx: 1,
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
        this.nodriza = new NaveNodriza(this, false);
        this.defensas = new Defensas(this);
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
        play_sonidos(this.sonidoAliensHere, false, 0.9);

        this.botonfullscreen.create();
        this.botonfire.create();
        this.crucetaleft.create();
        this.crucetaright.create();
        this.hideMobileControls();

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
        this.disparo.create();
        this.enemigo.create();
        this.disparoenemigo.create();
        this.defensas.create();
        this.marcador.create();

        this.add.timeline([
            {
                at: Settings.nodriza.aparecer,
                run: () =>
                {
                    this.nodriza.create();
                    this.physics.add.collider(this.nodriza.get(), this.disparo.get(), colisionDisparoVsNodriza, null, this);
                }
            }
        ]).play();

        this.set_colliders();
    }

    update()
    {
        this.jugador.update();
        this.disparo.update();
        this.enemigo.update();
        this.disparoenemigo.update();

        if (this.nodriza.activa) this.nodriza.update();
                
        if (this.jugador.get().active && this.jugador.get().visible)
        {
            inicia_disparo(this.jugador, this.scene, this.botonfire, this.time, this.disparo, this.sonidoDisparo);
        }
        
        inicia_disparo_enemigos(this);
        this.check_levelUp();
        this.check_gameOver();
    }

    check_levelUp()
    {
        if (this.enemigo.get().countActive() <= 0 && !Settings.isNivelSuperado())
        {
            Settings.setNivelSuperado(true);

            this.txtNivelSuperado = new Textos(this, {
                x: Math.floor(this.sys.game.config.width / 2),
                y: Math.floor(this.sys.game.config.height / 3.5),
                txt: ' Congratulations! ',
                size: 70, color: '#ffa', style: 'bold',
                stroke: '#1d2', sizeStroke: 16,
                shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
                bool1: false, bool2: true, origin: [0.5, 0.5],
                elastic: false, dura: 0
            });
            
            this.txtNivelSuperado.create();
            this.txtNivelSuperado.get().setDepth(Settings.depth.textos).setAlpha(1);

            this.tweens.add({
                targets: this.txtNivelSuperado.get(),
                alpha: 0,
                duration: 2800
            });

            this.add.timeline([
                {
                    at: 4000,
                    run: () => this.scene.start('Congratulations')
                }
            ]).play();
        }
    }

    check_gameOver()
    {
        if (Settings.isGameOver())
        {
            Settings.setGameOver(false);

            this.check_newRecord();

            this.txtGameOver = new Textos(this, {
                x: Math.floor(this.sys.game.config.width / 2),
                y: Math.floor(this.sys.game.config.height / 1.6),
                txt: ' Game Over ',
                size: 80, color: '#ffa', style: 'bold',
                stroke: '#1bc', sizeStroke: 16,
                shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
                bool1: false, bool2: true, origin: [0.5, 0.5],
                elastic: false, dura: 0
            });
            
            this.txtGameOver.create();
            this.txtGameOver.get().setScale(1).setAlpha(0);

            this.tweens.add({
                targets: this.txtGameOver.get(),
                alpha: 1,
                duration: 3800,
            });

            play_sonidos(this.sonidoGameOverRetro, false, 0.9);

            this.add.timeline([
                {
                    at: 2500,
                    run: () => play_sonidos(this.sonidoGameOverRetro, false, 0.9)
                },
                {
                    at: 3500,
                    run: () => play_sonidos(this.sonidoGameOverRetro, false, 0.9)
                },
                {
                    at: 7000,
                    run: () => this.scene.start('PreGame')
                }
            ]).play();
        }
    }

    check_newRecord()
    {
        if (Settings.getPuntos() >= Settings.getRecord()) {

            Settings.setRecord(Settings.getPuntos());

            this.txtnewrecord = new Textos(this, {
                x: Math.floor(this.sys.game.config.width / 2),
                y: Math.floor(this.sys.game.config.height / 3),
                txt: ' Enhorabuena! \n Nuevo Record! ',
                size: 50, color: '#ff9', style: 'bold',
                stroke: '#5f1', sizeStroke: 16,
                shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
                bool1: false, bool2: true, origin: [0.5, 0.5],
                elastic: false, dura: 0
            });
        
            this.txtnewrecord.create();
            this.txtnewrecord.get().setDepth(Settings.depth.marcadores);

            this.tweens.add({
                targets: this.txtnewrecord.get(),
                scale: 2.1,
                ease: 'sine.out',
                duration: 1000,
                yoyo: true,
                delay: 500,
                repeat: -1,
                repeatDelay: 3000
            });
        }
    }

    set_sonidos()
    {
        this.sonidoDisparo = this.sound.add('disparo-jugador');
        this.sonidoDisparoEnemigo = this.sound.add('disparo-enemigo');
        this.sonidoAliensAtmos = this.sound.add('aliens-atmos');
        this.sonidoAliensHere = this.sound.add('aliens-here');
        this.sonidoExplosion = this.sound.add('explosion');
        this.sonidoNaveExplota = this.sound.add('nave-explota');
        this.sonidoGameOverRetro = this.sound.add('gameover-retro');
        this.sonidoBonusNodriza = this.sound.add('bonus-nodriza');
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
        // Collider enemigo vs disparo
        this.physics.add.collider(this.enemigo.get(), this.disparo.get(), colisionDisparoVsEnemigo, null, this);

        // Collider enemigo vs jugador
        this.physics.add.overlap(this.enemigo.get(), this.jugador.get(), colisionJugadorVsEnemigo, excepcionJugadorVsEnemigo, this);

        // Collider disparoEnemigo vs jugador
        this.physics.add.overlap(this.disparoenemigo.get(), this.jugador.get(),
        colisionDisparoEnemigoVsJugador, excepcionDisparoEnemigoVsJugador, this);

        // Collider disparoEnemigo vs defensas
        this.physics.add.overlap(this.disparoenemigo.get(), this.defensas.get(), colisionDisparoEnemigoVsDefensas, null, this);

        // Collider disparo vs defensas
        this.physics.add.overlap(this.disparo.get(), this.defensas.get(), colisionDisparoVsDefensas, null, this);
    }
}
