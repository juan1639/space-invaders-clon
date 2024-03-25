import { Settings } from "../scenes/settings.js";

export class Disparo
{
    constructor(scene)
    {
        this.relatedScene = scene;
    }

    create()
    {
        this.disparo = this.relatedScene.physics.add.group(
        {
            key: 'disparo',
            setXY: { x: -9999, y: 9999, stepX: 150 },
            repeat: Settings.disparo.NRO_MAX_DISPAROS - 1
        });

        this.relatedScene.tweens.add({
            targets: this.disparo.getChildren(),
            tint: new Phaser.Display.Color(0, Phaser.Math.Between(90, 200), Phaser.Math.Between(90, 120)).color,
            duration: 300,
            repeat: -1
        });

        this.disparo.getChildren().forEach(disp =>
        {
            disp.setScale(2, 3).setActive(false).setVisible(false);
            // console.log(disp.body.width, disp.body.height);
        });

        this.cadencia = {allowNext: 200, flag: 0};

        console.log(this.disparo);
    }

    update()
    {
        this.disparo.children.iterate(disp =>
        {
            if (disp.y < 0)
            {
                disp.setActive(false).setVisible(false).setX(-9999);
            }
        });
    }
    
    get()
    {
        return this.disparo;
    }
}
