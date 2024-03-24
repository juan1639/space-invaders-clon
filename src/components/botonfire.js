
export class BotonFire
{
    constructor(scene)
    {
        this.relatedScene = scene;
    }

    create()
    {
        const ancho = this.relatedScene.sys.game.config.width;
        const alto = this.relatedScene.sys.game.config.height;

        this.boton = this.relatedScene.add.image(ancho - 100, alto - 90, 'boton-fire-joystick').setInteractive();
        this.boton.setScale(2.3);
        this.isDown = false;
    
        this.boton.on('pointerover', () => {
          this.boton.setScale(2.07);
        });

        this.boton.on('pointerout', () => {
          this.boton.setScale(2);
        });

        this.boton.on('pointerdown', () => {
            this.isDown = true;
            
        });

        this.boton.on('pointerup', () => {
            this.isDown = false;
        });
    }

    get()
    {
        return this.boton;
    }
}

// ==================================================================================
export class CrucetaDireccion
{
    constructor(scene, direccion) {
        this.relatedScene = scene;
        this.direccion = direccion;
    }

    create() {
        const ancho = this.relatedScene.sys.game.config.width;
        const alto = this.relatedScene.sys.game.config.height;
        
        this.boton = this.relatedScene.add.image(this.direccion.x, alto - this.direccion.y, this.direccion.id).setInteractive();
        this.boton.setScale(2.7, 2.3);
        this.isDown = false;
    
        this.boton.on('pointerover', () => {
          this.boton.setScale(2.8, 2.4);
        });

        this.boton.on('pointerout', () => {
          this.boton.setScale(2.7, 2.3);
        });

        this.boton.on('pointerdown', () => {
            this.isDown = true;
            
        });

        this.boton.on('pointerup', () => {
            this.isDown = false;
        });
    }

    get()
    {
        return this.boton;
    }
}

