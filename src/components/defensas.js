import { Settings } from "../scenes/settings.js";

export class Defensas
{
    constructor(scene)
    {
        this.relatedScene = scene;
    }

    create()
    {
        this.defensas = this.relatedScene.physics.add.group();

        for (let defen = 0; defen < Settings.defensas.length; defen ++)
        {
            const x = Settings.defensas[defen][0];
            const y = Settings.defensas[defen][1];
            const ver = Settings.defensas[defen][3];
            const hor = Settings.defensas[defen][2];
            const w = Settings.defensas[defen][4];
            const h = Settings.defensas[defen][5];

            for (let i = 0; i < ver; i ++)
            {
                for (let ii = 0; ii < hor; ii ++)
                {
                    this.defensas.create(x + w * ii, y + h * i, 'defensas');
                }
            }
        }

        this.defensas.children.iterate((defen, index) =>
        {
            defen.setScale(1).setDepth(Settings.depth.enemigo);
        });

        console.log(this.defensas);
    }

    update()
    {

    }

    get()
    {
        return this.defensas;
    }
}
