import { Settings } from "../scenes/settings.js";
// import { centrar_txt } from "../functions/functions.js";

export class Marcador
{
    constructor(scene)
    {
        this.relatedScene = scene;
    }

    create()
    {
        this.marcadores = this.relatedScene.add.group();

        const ancho = this.relatedScene.sys.game.config.width;
        const alto = this.relatedScene.sys.game.config.height;

        this.args = [
            [ ' Score: ', 20, '#fff', '#2ef', 7, 0, 0, Settings.getPuntos() ],
            [ ' Level: ', 20, '#fff', '#2ef', 7, Math.floor(ancho / 2), 0, Settings.getNivel() ],
            [ ' Record: ', 20, '#fff', '#2ef', 7, Math.floor(ancho / 1.4), 0, Settings.getRecord() ]
        ];

        this.args.forEach((arg, index) =>
        {
            let cadaMarcador = this.relatedScene.add.text(arg[5], arg[6], arg[0] + arg[7], {
                fontSize: arg[1] + 'px',
                fill: arg[2],
                fontFamily: 'verdana, arial, sans-serif',
                shadow: {
                    offsetX: 1,
                    offsetY: 1,
                    color: arg[3],
                    blur: arg[4],
                    fill: true
                }
            });

            if (index === 1) cadaMarcador.setX(centrar_txt(cadaMarcador, ancho));

            this.marcadores.add(cadaMarcador);
        });

        console.log(this.marcadores);
    }

    update(id, valor)
    {
        this.marcadores.getChildren()[id].setText(this.args[id][0] + valor);
    }

    get()
    {
        return this.marcadores;
    }
}
