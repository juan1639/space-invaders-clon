import { Settings } from "../scenes/settings.js";

export class Jugador
{
    constructor(scene)
    {
        this.relatedScene = scene;
    }

    create()
    {
        this.jugador = this.relatedScene.physics.add.sprite(
            Settings.jugador.posIniX, Settings.jugador.posIniY, 'jugador'
        );

        this.jugador.setScale(3);
        this.jugador.setAlpha(1);

        this.jugador.setData('posIni', [Settings.jugador.posIniX, Settings.jugador.posIniY]);
        this.jugador.setData('vel-x', Settings.jugador.velX);
        this.jugador.setData('acel-x', Settings.jugador.acelX);
        this.jugador.setData('vel-y', Settings.jugador.velY);
        this.jugador.setCollideWorldBounds(true);
        this.jugador.setBounce(0.2);

        this.controles = this.relatedScene.input.keyboard.createCursorKeys();
        this.joystickCursors = this.relatedScene.joyStick.createCursorKeys();

        console.log(this.controles);
        // console.log(this.jugador, this.jugador.x, this.jugador.body.width, this.jugador.width);
    }

    update()
    {
        if (this.relatedScene.enemigo.invisibleInvaders) return;
        
        if (this.controles.left.isDown || this.joystickCursors.left.isDown)
        {
            this.jugador.setVelocityX(-this.jugador.getData('vel-x'));
            
        } else if (this.controles.right.isDown  || this.joystickCursors.right.isDown)
        {
            this.jugador.setVelocityX(this.jugador.getData('vel-x'));
        
        } else
        {
            this.jugador.setVelocityX(0);
        }
    }
    
    get()
    {
        return this.jugador;
    }
}

// =======================================================================
export class JugadorShowVidas
{
    static xAbsolute = 240;
    static ancho = 32; // 124
    static alto = 28; // 183

    constructor(scene)
    {
        this.relatedScene = scene;
    }

    create()
    {
        this.jugadorSV = this.relatedScene.add.group({
            key: 'jugador',
            setXY: { x: JugadorShowVidas.xAbsolute, y: Math.floor(JugadorShowVidas.alto / 2), stepX: JugadorShowVidas.ancho},
            repeat: Settings.getVidas() - 1
        });

        this.jugadorSV.children.iterate(vida =>
        {
            vida.setScale(1);
            vida.setAlpha(0.9);
        });

        console.log(this.jugadorSV);
    }

    get()
    {
        return this.jugadorSV;
    }
}
