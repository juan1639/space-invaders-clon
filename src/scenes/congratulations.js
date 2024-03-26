import { Settings } from './settings.js';
import { Textos } from '../components/textos.js';
import { BotonNuevaPartida } from "../components/boton-nuevapartida.js";
import { play_sonidos } from '../functions/functions.js';

export class Congratulations extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'Congratulations' });
  }

  init()
  {
    this.botoninicio = new BotonNuevaPartida(this);
  }

  create()
  {
    this.add.image(0, 0, 'fondo').setOrigin(0, 0);

    const aparecerBoton = 3200;
    this.incremento_nivel = Settings.getNivel() + 1;
    Settings.setNivelSuperado(false);
    
    this.sonido_intermision = this.sound.add('aliens-atmos');

    this.txt = new Textos(this, {
      x: Math.floor(this.sys.game.config.width / 2),
      y: Math.floor(this.sys.game.config.height / 3.5),
      txt: ' Level Up! ',
      size: 86, color: '#ffa', style: 'bold',
      stroke: '#1cb', sizeStroke: 16,
      shadowOsx: 2, shadowOsy: 2, shadowColor: '#111111',
      bool1: false, bool2: true, origin: [0.5, 0.5],
      elastic: false, dura: 0
    });

    this.txt.create();
    this.txt.get().setDepth(Settings.depth.textos).setAlpha(1);

    this.timeline = this.add.timeline([
        {
          at: aparecerBoton,
          run: () => {
            Settings.setNivel(this.incremento_nivel);
            this.botoninicio.create('Game', false);
          }
        }
    ]);
    
    this.timeline.play();

    play_sonidos(this.sonido_intermision, false, 0.8);

    console.log(this.txt);
  }
}
