import { Settings } from '../scenes/settings.js';

export class Textos
{
    constructor(scene, datos)
    {
        this.relatedScene = scene;
        this.datos = datos;
    }

    create()
    {
        const {
            x, y, txt,
            size, color, style,
            stroke, sizeStroke,
            shadowOsx, shadowOsy, shadowColor,
            bool1, bool2, origin,
            elastic, dura
        } = this.datos;

        this.texto = this.relatedScene.add.text(x, y, txt, {
            fontSize: size + 'px',
            fill: color,
            fontFamily: 'verdana, arial, sans-serif',
            fontStyle: style
        });

        this.texto.setOrigin(origin[0], origin[1]);
        this.texto.setStroke(stroke, sizeStroke);
        this.texto.setShadow(shadowOsx, shadowOsy, shadowColor, 2, bool1, bool2);
        //#de77ae

        // if (!excepcionesString.includes(txt)) this.texto.setX(centrar_txt(this.texto, args[12] * args[13]));

        this.elastic(txt, elastic, dura);

        console.log(this.texto);
    }
    
    elastic(txt, elastic, dura)
    {
        if (dura > 0)
        {
            this.relatedScene.tweens.add(
            {
                targets: this.texto,
                y: elastic,
                ease: 'Elastic',
                duration: dura
            });
        }
    }

    get()
    {
        return this.texto;
    }
}
