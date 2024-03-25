import { Settings } from "../scenes/settings";
import { Textos } from "./textos";

export class BotonNuevaPartida
{
  constructor(scene)
  {
    this.relatedScene = scene;
  }

  create(siguienteScene, gameover)
  {
    // this.sonidoMenuSelect = this.relatedScene.sound.add('moneda-mario');

    const ancho = this.relatedScene.sys.game.config.width;
    const alto = this.relatedScene.sys.game.config.height;
    const botonCondicional = 'boton-nueva-partida';
    
    this.boton = this.relatedScene.add.sprite(Math.floor(ancho / 2), Math.floor(alto / 1.6), botonCondicional).setInteractive();
    this.boton.setScale(0.6).setAngle(1).setDepth(30);

    this.boton.on('pointerover', () => {
      // this.boton.setFrame(1);
      this.boton.setScale(0.7);
    });

    this.boton.on('pointerout', () => {
      // this.boton.setFrame(0);
      this.boton.setScale(0.6);
    });

    this.boton.on('pointerdown', (e) => {

      // play_sonidos(this.sonidoMenuSelect, false, 0.9);
      this.relatedScene.scene.start(siguienteScene);
      console.log(e);
    });

    this.relatedScene.tweens.add(
    {
      targets: this.boton,
      angle: 359,
      ease: 'Elastic',
      yoyo: true,
      hold: 2000,
      duration: 3000,
      repeat: -1
    });
  }

  get()
  {
    return this.boton;
  }
}

// ==================================================================================
export class BotonFullScreen
{
  constructor(scene, args)
  {
    this.relatedScene = scene;
    this.args = args;
  }

  create()
  {
    const {x, y, id, scX, scY, ang} = this.args;

    this.boton = this.relatedScene.add.image(x, y, id).setInteractive();
    this.boton.setScale(scX, scY);
    this.boton.setAngle(ang).setFrame(0).setDepth(50);
    this.boton.setX(x).setY(y + Math.floor(this.boton.height / 2));

    this.boton.on('pointerover', () =>
    {
      // this.boton.setFrame(1);
      this.boton.setScale(scX + 0.1, scY + 0.1);
    });
    
    this.boton.on('pointerout', () =>
    {
      // this.boton.setFrame(0);
      this.boton.setScale(scX, scY);
    });

    this.boton.on('pointerdown', () =>
    {
      if (!this.relatedScene.scale.isFullscreen)
      {
        this.relatedScene.scale.startFullscreen();

      } else
      {
        this.relatedScene.scale.stopFullscreen();
      }
    });
  }
}

// =============================================================================
export class ElegirControles
{
  constructor(scene, args)
  {
    this.relatedScene = scene;
    this.args = args;
  }

  create()
  {
    const {left, top, frame, scale, texto, id} = this.args;

    this.radiobutton = this.relatedScene.add.sprite(left, top, 'radio-buttons').setInteractive();
    this.radiobutton.setOrigin(0, 0.5).setScale(scale).setDepth(Settings.depth.textos).setFrame(frame);
    this.radiobutton.setData('id', id);

    this.txt = new Textos(this.relatedScene, {
      x: left + 60,
      y: top,
      txt: texto,
      size: 45, color: '#ffa', style: 'bold',
      stroke: '#f71', sizeStroke: 16,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111',
      bool1: false, bool2: true, origin: [0, 0.5],
      elastic: false, dura: 0
    });

    this.txt.create();

    this.radiobutton.on('pointerover', () =>
    {
      this.txt.get().setScale(scale + 0.1);
      this.radiobutton.setScale(scale + 0.1);
    });
    
    this.radiobutton.on('pointerout', () =>
    {
      this.txt.get().setScale(scale);
      this.radiobutton.setScale(scale);
    });

    this.radiobutton.on('pointerdown', (e) =>
    {
      // play_sonidos(this.sonidoMenuSelect, false, 0.9);
      this.relatedScene.radiobuttons.forEach(radio => radio.get().setFrame(0));
      this.radiobutton.setFrame(1);

      Object.keys(Settings.controlElegido).forEach(control => {
        Settings.controlElegido[control] = false;
      });

      Settings.controlElegido[this.radiobutton.getData('id')] = true;

      console.log(Settings.controlElegido.mobile, Settings.controlElegido.teclado);
    });
  }

  get()
  {
    return this.radiobutton;
  }
}
