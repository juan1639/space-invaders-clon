import { Settings } from '../scenes/settings.js';
// import { centrar_txt } from '../functions/functions.js';

export class Enemigo
{
    static tileXY = [64, 64];
    static VEL_Y = 120;

    constructor(scene)
    {
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

        this.relatedScene.tweens.add({
            targets: this.enemigos.getChildren(),
            angle: 10,
            yoyo: true,
            duration: 1000,
            repeat: -1
        });

        this.crea_enemigos_descendentes();
        this.crea_anims(Settings.getNivel());

        const timeline = this.relatedScene.add.timeline([
            {
                at: 30000,
                run: () => {
                    this.enemigos.children.iterate(ene => {

                        ene.setVelocityY(Enemigo.VEL_Y);
                    });
                }
            }
        ]);

        timeline.play();

        console.log(this.enemigos.getChildren());
    }

    update()
    {
        this.formacion.x += this.formacion.velX;

        if ((this.formacion.x >= this.formacion.recorrido && this.formacion.velX > 0) || (this.formacion.x <= -this.formacion.recorrido / 2 && this.formacion.velX < 0)) {
            this.formacion.velX = -this.formacion.velX;
        }

        Phaser.Actions.IncX(this.enemigos.getChildren(), this.formacion.velX);

        this.enemigos.children.iterate(ene => {

            if (ene.y > this.relatedScene.sys.game.config.height) ene.setVelocityY(-Enemigo.VEL_Y);
            if (ene.y < -200) ene.setVelocityY(Enemigo.VEL_Y);
        });
    }

    inicializar(ene, index)
    {
        ene.setAngle(350);
        ene.setScale(0.4);
        ene.setDepth(2);
        ene.setData('puntos', 100 + Phaser.Math.Between(0, 9) * 10);
    }

    crea_enemigos_descendentes()
    {
        let frecuencia = 7000 - Settings.getNivel() * 500;
        if (frecuencia <= 2500) frecuencia = 2500;

        let hastaAbajo = 100 - Settings.getNivel() * 10;
        if (hastaAbajo <= 0) hastaAbajo = 0;

        let descender = [];

        if (Settings.getNivel() === 1) {

            this.enemigos.children.iterate((ene, index) => {

                if (index >= 24) descender.push(ene);
            });

        } else {

            this.enemigos.children.iterate((ene, index) => {

                descender.push(ene);
            });
        }

        this.relatedScene.tweens.add({
            targets: descender,
            y: this.relatedScene.sys.game.config.height - hastaAbajo,
            ease: 'sine.out',
            duration: 1000,
            yoyo: true,
            delay: 5500,
            repeat: -1,
            repeatDelay: frecuencia
        });
    }

    crea_anims(nivel)
    {
        const keysAnima = [
            ['enemys-anim', 'enemigos'],
            ['enemys2-anim', 'enemigos2']
        ];

        keysAnima.forEach(anima => {

            this.relatedScene.anims.create({
                key: anima[0],
                frames: this.relatedScene.anims.generateFrameNumbers(anima[1], { frames: [ 0, 1, 2] }),
                frameRate: 5,
                repeat: -1
            });
        });

        if (nivel === 1) {

            this.enemigos.getChildren().forEach((ene, index) => {

                if (index < 24) {
                    ene.play('enemys-anim');
                } else {
                    ene.play('enemys2-anim');
                }
            });

        } else {

            this.enemigos.getChildren().forEach((ene, index) => {

                if (index < 24) {
                    ene.play('enemys-anim');
                } else {
                    ene.play('enemys2-anim');
                }
            });
        }
    }

    get_posicion(index)
    {
        const y = Math.floor(index / Enemigo.array_enemigos[0].length);
        const x = index - (y * Enemigo.array_enemigos[0].length);
        
        return [x, y];
    }

    formaciones_nivel(nivel)
    {
        const formaciones = [
            {
                x: 0,// (Nivel 0 --> No hay)
                velX: 1,
                recorrido: 60,
                // marginLeft: Math.floor(Enemigo.tileXY[0] / 2),
                marginLeft: 0,
                // marginTop: Math.floor(Enemigo.tileXY[1]),
                marginTop: 0,
                EnemigoDeCadaTipo: [24, 24],
                columnas: 4
            },
            {
                x: 0,// Nivel 1
                velX: 1,
                recorrido: 60,
                // marginLeft: Math.floor(Enemigo.tileXY[0] / 2),
                marginLeft: 0,
                // marginTop: Math.floor(Enemigo.tileXY[1]),
                marginTop: 0,
                EnemigoDeCadaTipo: [24, 24],
                columnas: 4
            },
            {
                x: 0,// Nivel 2
                velX: 2,
                recorrido: 60,
                // marginLeft: Math.floor(Enemigo.tileXY[0] / 2),
                marginLeft: 0,
                marginTop: -Enemigo.tileXY[1] * 2,
                EnemigoDeCadaTipo: [36, 36],
                columnas: 6

            },
            {
                x: 0,// Nivel 3
                velX: 2,
                recorrido: 60,
                // marginLeft: Math.floor(Enemigo.tileXY[0] / 2),
                marginLeft: 0,
                marginTop: -Enemigo.tileXY[1] * 4,
                EnemigoDeCadaTipo: [48, 48],
                columnas: 8
            },
            {
                x: 0,// Nivel 4
                velX: 2,
                recorrido: 60,
                // marginLeft: Math.floor(Enemigo.tileXY[0] / 2),
                marginLeft: 0,
                marginTop: -Enemigo.tileXY[1] * 4,
                EnemigoDeCadaTipo: [48, 48],
                columnas: 8
            }
        ];

        if (nivel > 4) return formaciones[4];

        return formaciones[nivel];
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

