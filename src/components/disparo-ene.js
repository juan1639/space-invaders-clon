import { Settings } from "../scenes/settings.js";

export class DisparoEnemigo
{
    constructor(scene)
    {
        this.relatedScene = scene;
    }

    create()
    {
        this.disparoenemigo = this.relatedScene.physics.add.group(
        {
            key: 'disparo-ene',
            setXY: { x: -8888, y: 8888, stepX: 150 },
            repeat: Settings.disparoEnemigo.NRO_MAX_DISPAROS
        });

        this.disparoenemigo.getChildren().forEach(disp =>
        {
            disp.setScale(2);
            disp.setActive(false).setVisible(false).disableBody(true, true);
            // console.log(disp.body.width, disp.body.height);
        });

        const intensidadDisparos = this.get_intensidadDisparos();
        this.cadencia = {disparo: intensidadDisparos, bandera: 0};

        console.log(this.disparoenemigo);
    }

    update()
    {
        this.disparoenemigo.children.iterate(disp =>
        {
            if (disp.y > this.relatedScene.sys.game.config.height) disp.setActive(false).setVisible(false).disableBody(true, true);
        });
    }

    get_intensidadDisparos()
    {
        let progresivo = Settings.disparoEnemigo.MIN_INTENSIDAD - Settings.getNivel() * 40;

        if (progresivo < Settings.disparoEnemigo.MAX_INTENSIDAD) return Settings.disparoEnemigo.MAX_INTENSIDAD;
        return progresivo;
    }
    
    get()
    {
        return this.disparoenemigo;
    }
}
