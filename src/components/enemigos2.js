import { Settings } from '../scenes/settings.js';
import { Textos } from './textos.js';

export class Enemigo
{
    constructor(scene, args)
    {
        this.relatedScene = scene;
        this.args = args;
    }

    create()
    {
        const {
            left, top, vx, vy,
            each,
            numberAliensHor, numberAliensVer,
            gapX, gapY,
            marginLeft, marginTop

        } = this.args;

        this.formacion =
        {
            x: left,
            y: top,
            velX: vx,
            velY: vy,
            totalAliens: numberAliensHor * numberAliensVer,
            width: numberAliensHor * gapX - gapX
        }

        this.enemigos = this.relatedScene.physics.add.group(
        {
            key: ['invader1', 'invader2', 'invader3'],
            frameQuantity: each,
            gridAlign: { 
                width: numberAliensHor, 
                height: numberAliensVer, 
                cellWidth: gapX, 
                cellHeight: gapY, 
                x: marginLeft,  
                y: marginTop
            }
        });

        this.enemigos.getChildren().forEach((ene, index) =>
        {
            ene.setAlpha(0).setAngle(355).setScale(0).setDepth(Settings.depth.enemigo);
            ene.setData('puntos', 400 - index * 5);
        });

        this.relatedScene.tweens.add({
            targets: this.enemigos.getChildren(),
            angle: 5,
            yoyo: true,
            duration: 1000,
            repeat: -1
        });

        this.invisibleTime = 4800;
        this.invisibleInvaders = true;

        this.relatedScene.tweens.add({
            targets: this.enemigos.getChildren(), alpha: 1, scale: 2, duration: this.invisibleTime,
        });

        this.crea_anims(Settings.getNivel());

        const timeline = this.relatedScene.add.timeline([
            {
                at: this.invisibleTime,
                run: () => this.invisibleInvaders = false
            }
        ]);

        timeline.play();

        this.txtReady();

        console.log(this.enemigos.getChildren());
    }

    update()
    {
        if (this.invisibleInvaders) return;

        this.formacion.x += this.formacion.velX;

        if (
            (this.formacion.x + this.formacion.width >= this.relatedScene.sys.game.config.width && this.formacion.velX > 0) ||
            (this.formacion.x <= 0 / 2 && this.formacion.velX < 0))
        {
            this.formacion.velX = -this.formacion.velX;

            const velGodown = this.formacion.velY * Settings.getIncGodownInvaders()[Settings.getNivel()];
            Phaser.Actions.IncY(this.enemigos.getChildren(), velGodown);
        }

        Phaser.Actions.IncX(this.enemigos.getChildren(), this.formacion.velX);
    }

    crea_anims(nivel)
    {
        const keysAnima = [
            ['enemys-anim', 'invader1'],
            ['enemys2-anim', 'invader2'],
            ['enemys3-anim', 'invader3']
        ];

        keysAnima.forEach(anima =>
        {
            this.relatedScene.anims.create({
                key: anima[0],
                frames: this.relatedScene.anims.generateFrameNumbers(anima[1], {frames: [0, 1]}),
                duration: 600,
                yoyo: true,
                repeat: -1
            });
        });

        this.enemigos.children.iterate((ene, index) =>
        {
            if (index < Math.floor(this.formacion.totalAliens / keysAnima.length))
            {
                ene.play('enemys-anim');
                ene.setTint(Settings.coloresInvaders.rojo);
            }
            else if (index < Math.floor(this.formacion.totalAliens / keysAnima.length) * 2)
            {
                ene.play('enemys2-anim');
                ene.setTint(Settings.coloresInvaders.verde);
            }
            else if (index < Math.floor(this.formacion.totalAliens / keysAnima.length) * 3)
            {
                ene.play('enemys3-anim');
                ene.setTint(Settings.coloresInvaders.amarillo);
            }
        });
    }

    get_posicion(index)
    {
        const y = Math.floor(index / Enemigo.array_enemigos[0].length);
        const x = index - (y * Enemigo.array_enemigos[0].length);
        
        return [x, y];
    }

    txtReady()
    {
        this.txt = new Textos(this.relatedScene, {
            x: Math.floor(this.relatedScene.sys.game.config.width / 2),
            y: Math.floor(this.relatedScene.sys.game.config.height / 1.7),
            txt: ' Ready... ',
            size: 40, color: '#ffa', style: 'bold',
            stroke: '#9dc', sizeStroke: 8,
            shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
            bool1: false, bool2: true, origin: [0.5, 0.5],
            elastic: Math.floor(this.relatedScene.sys.game.config.height / 1.4), dura: this.invisibleTime - 1000
        });

        this.txt.create();
        this.relatedScene.tweens.add({
            targets: this.txt.get(), alpha: 0, ease: 'Sine.easeOut', duration: this.invisibleTime
        });
    }

    get()
    {
        return this.enemigos;
    }
}

// ======================================================================================
export class EnemigoApareciendo extends Enemigo
{
    constructor(scene)
    {
        super();
        this.relatedScene = scene;
    }

    create()
    {
        this.formacion = this.formaciones_nivel(Settings.getNivel());
        console.log(Settings.getNivel());

        this.enemigos = this.relatedScene.physics.add.group({
            key: ['enemigos', 'enemigos2'],
            frameQuantity: this.formacion.EnemigoDeCadaTipo[0],
            gridAlign: { 
                width: 12, 
                height: this.formacion.columnas, 
                cellWidth: Enemigo.tileXY[0], 
                cellHeight: Enemigo.tileXY[1], 
                x: this.formacion.marginLeft,  
                y: this.formacion.marginTop
            }
        });

        this.enemigos.getChildren().forEach((ene, index) => {
            this.inicializar(ene, index);
        });

        this.crea_enemigos_descendentesApareciendo();
        this.crea_anims(Settings.getNivel());

        const txtX = this.relatedScene.sys.game.config.width;
        const txtY = this.relatedScene.sys.game.config.height;

        this.txt_preparado = this.relatedScene.add.text(Math.floor(txtX / 2.6), Math.floor(txtY / 1.4), ' Ready...', {
            fontSize: '40px',
            fontStyle: 'bold',
            style: {
                align: 'center',
            },
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: '#cff',
                blur: 1,
                fill: true
            },
            fill: '#1aa',
            fontFamily: 'verdana, arial, sans-serif'
        });

        this.txt_preparado.setAlpha(0);
        this.txt_preparado.setX(centrar_txt(this.txt_preparado, txtX));

        this.relatedScene.tweens.add({
            targets: this.txt_preparado,
            alpha: 1,
            yoyo: true,
            duration: 2000,
        });

        console.log(this.enemigos.getChildren());
    }

    update() {}

    inicializar(ene, index)
    {
        ene.setAngle(0);
        ene.setScale(0.4);
        ene.setAlpha(0);
    }

    crea_enemigos_descendentesApareciendo()
    {
        this.relatedScene.tweens.add({
            targets: this.enemigos.getChildren(),
            alpha: 1,
            delay: 1400,
            duration: 4100
        });

        this.relatedScene.tweens.add({
            targets: this.enemigos.getChildren(),
            y: -(Math.floor(this.relatedScene.sys.game.config.height / 2)),
            // ease: 'sine.out',
            ease: 'Sine.easeIn',
            duration: 2400,
            yoyo: true
        });
    }
}

