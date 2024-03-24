import { Settings } from "../scenes/settings.js";

export class DisparoEnemigo
{
    static NRO_MAX_DISPAROS = 9;
    static VEL_Y = 100;

    constructor(scene)
    {
        this.relatedScene = scene;
    }

    create()
    {
        this.disparoenemigo = this.relatedScene.physics.add.group({
            key: 'disparo-ene',
            setXY: { x: -8888, y: 8888, stepX: 150 },
            repeat: DisparoEnemigo.NRO_MAX_DISPAROS
        });

        this.relatedScene.anims.create({
            key: 'disparo-ene-anim',
            frames: this.relatedScene.anims.generateFrameNumbers('disparo-ene', { frames: [ 0, 1, 2, 3 ] }),
            frameRate: 10,
            repeat: -1
        });

        /* this.relatedScene.tweens.add({
            targets: this.disparoenemigo.getChildren(),
            scale: 1.1,
            duration: 200,
            yoyo: true,
            repeat: -1,
        }); */

        this.disparoenemigo.getChildren().forEach(disp => {
            disp.setScale(0.8);
            // disp.setAngle(90);
            disp.setActive(false).setVisible(false).disableBody(true, true);
            disp.play('disparo-ene-anim');
            // console.log(disp.body.width, disp.body.height);
        });

        const intensidadDisparos = 2000 - Settings.getNivel() * 100;

        this.cadencia = {
            disparo: intensidadDisparos,
            bandera: 0
        };

        console.log(this.disparoenemigo);
    }

    update()
    {
        this.disparoenemigo.children.iterate(disp =>
        {
            if (disp.y > this.relatedScene.sys.game.config.height) {

                disp.setActive(false).setVisible(false).disableBody(true, true);
            }
        });
    }
    
    get()
    {
        return this.disparoenemigo;
    }
}
