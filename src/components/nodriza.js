import { Settings } from "../scenes/settings.js";

export class NaveNodriza
{
    constructor(scene, bool)
    {
        this.relatedScene = scene;
        this.activa = bool;
    }

    create()
    {
        this.activa = true;

        const rnd = Phaser.Math.Between(0, 10);
        this.velX = Settings.nodriza.velX + Settings.getNivel() * 50;
        let x = Settings.nodriza.posIniX;

        if (rnd < 5)
        {
            this.velX = -this.velX;
            x = Settings.nodriza.posIniXRight;
        }

        this.nodriza = this.relatedScene.physics.add.sprite(x, Settings.nodriza.posIniY, 'nodriza-ssheet');

        this.nodriza.setScale(2).setVelocityX(this.velX);

        this.relatedScene.anims.create(
        {
            key: 'nodriza-anims',
            frames: this.relatedScene.anims.generateFrameNumbers('nodriza-ssheet', {frames: [0, 1, 2, 3, 4]}),
            duration: 2000,
            yoyo: true,
            repeat: -1
        });

        this.nodriza.play('nodriza-anims');
    }

    update()
    {
        if (
            (this.nodriza.x > this.relatedScene.sys.game.config.width * 2 && this.velX > 0) ||
            (this.nodriza.x < -this.relatedScene.sys.game.config.width && this.velX < 0)
        )
        {
            this.velX = -this.velX;
            this.nodriza.setVelocityX(this.velX);
        }
    }

    get()
    {
        return this.nodriza;
    }
}
