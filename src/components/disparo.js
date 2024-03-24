
export class Disparo
{
    static NRO_MAX_DISPAROS = 3;
    static VEL_Y = -500;

    constructor(scene)
    {
        this.relatedScene = scene;
    }

    create()
    {
        this.disparo = this.relatedScene.physics.add.group({
            key: 'disparos',
            setXY: { x: -9999, y: 9999, stepX: 150 },
            repeat: Disparo.NRO_MAX_DISPAROS
        });

        this.relatedScene.tweens.add({
            targets: this.disparo.getChildren(),
            tint: new Phaser.Display.Color(0, Phaser.Math.Between(40, 250), 125).color,
            duration: 500,
            repeat: -1
        });

        this.relatedScene.anims.create({
            key: 'disparos-anim',
            frames: this.relatedScene.anims.generateFrameNumbers('disparos', { frames: [0, 1] }),
            frameRate: 15,
            repeat: -1
        });

        this.disparo.getChildren().forEach(disp => {
            disp.setScale(0.5, 1);
            disp.setActive(false).setVisible(false);
            disp.play('disparos-anim');
            // console.log(disp.body.width, disp.body.height);
        });

        this.cadencia = {
            disparo: 200,
            bandera: 0
        };

        console.log(this.disparo);
    }

    update()
    {
        this.disparo.children.iterate(disp => {
            if (disp.y < 0) {

                disp.setActive(false).setVisible(false).setX(-9999);
            }
        });
    }
    
    get()
    {
        return this.disparo;
    }
}
