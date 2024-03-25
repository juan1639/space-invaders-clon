import { Settings } from "../scenes/settings";

function inicia_disparo(jugador, scene, botonfire, time, disparo, sonidoDisparo)
{
  if (jugador.controles.shift.isDown) scene.start('gameover');

  if (jugador.controles.space.isDown || botonfire.isDown)
  {
    if (time.now > disparo.cadencia.flag)
    {
      console.log('disparo');
      let buscar = false;

      disparo.get().getChildren().forEach(disp => {

        console.log(disp.active);

        if (!disp.active && !disp.visible && !buscar)
        {
          buscar = true;
          disp.setActive(true).setVisible(true);
          disp.enableBody(true, jugador.get().x, jugador.get().y - Math.floor(jugador.get().body.height / 2), true, true);
          disp.setVelocityY(Settings.disparo.VelY);
          play_sonidos(sonidoDisparo, false, 0.8);
        }
      });

      disparo.cadencia.flag = time.now + disparo.cadencia.allowNext;
    }
  }
}

function play_sonidos(id, loop, volumen)
{
  id.volume = volumen;
  id.loop = loop;
  id.play();
}

export {
  inicia_disparo,
  play_sonidos
};
