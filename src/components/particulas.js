
export class Particulas
{
    static NRO_PARTICULAS = 9;
    static NRO_PARTICULAS_TOTAL = 15 * Particulas.NRO_PARTICULAS;
    static DURACION_PARTICULAS = 1250;

    constructor(scene)
    {
        this.relatedScene = scene;
    }

    create()
    {
        this.particulas = this.relatedScene.physics.add.group({
            key: 'particula',
            // frame: 0,
            setXY: { x: -5555, y: -5555, stepX: 100 },
            repeat: Particulas.NRO_PARTICULAS_TOTAL
        });

        this.particulas.children.iterate(particula => {
            particula.setTint(new Phaser.Display.Color(255, Phaser.Math.Between(125, 255), 0).color);
            particula.setScale(Phaser.Math.FloatBetween(0.4, 1.3));
            particula.setActive(false).setVisible(false);
            // console.log(particula.body.width, particula.body.height);
        });

        console.log(this.particulas);
    }

    update() {}
    
    get()
    {
        return this.particulas;
    }
}
