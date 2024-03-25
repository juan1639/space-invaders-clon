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

function colisionJugadorVsEnemigo(enemigo, jugador)
{
  console.log('colision...jugador-enemigo');
  console.log(jugador);

  draw_explosionTimeout(this, jugador);

  particulas(
    jugador.x, jugador.y, 'particula-tint',
    {min: 120, max: 180},
    {min: Settings.pausas.duracionExplosion.enemigo, max: Settings.pausas.duracionExplosion.enemigo + 300},
    {start: 0.6, end: 0},
    // 0xffffff,
    // new Phaser.Display.Color(255, Phaser.Math.Between(50, 240), 0).color,
    jugador.tint,
    null, false, this
  );

  particulas(
    enemigo.x, enemigo.y, 'particula-tint',
    {min: 120, max: 200},
    {min: 1500, max: 2000},
    {start: 0.8, end: 0},
    // 0xffffff,
    new Phaser.Display.Color(Phaser.Math.Between(0, 125), Phaser.Math.Between(125, 255), 0).color,
    null, false, this
  );

  if (Settings.getVidas() > 0)
  {
    setTimeout(() =>
    {
      enemigo.setActive(true).setVisible(true).setAlpha(0.1);
      enemigo.enableBody(true, Settings.jugador.posIniX, Settings.jugador.posIniY, true, true);

      this.tweens.add(
      {
        targets: enemigo,
        alpha: 1,
        duration: Settings.pausas.invisible
      });
    }, Settings.pausas.revivir);
  }

  // restar_vida();
  // if (Settings.getVidas() >= 0) this.jugadorSV.get().getChildren()[Settings.getVidas()].setVisible(false);
  
  suma_puntos(jugador);
  // this.marcador.update(0, Settings.getPuntos());
  
  jugador.setActive(false).setVisible(false).disableBody(true, true);
  enemigo.setActive(false).setVisible(false).disableBody(true, true);
}

function excepcionJugadorVsEnemigo(enemigo, jugador)
{
  if (enemigo.alpha < 1) return false;
  return true;
}

function colisionDisparoVsEnemigo(disparo, enemigo)
{
  console.log('colision...disparo-enemigo');
  console.log(disparo);

  draw_explosionTimeout(this, disparo);

  particulas(
    disparo.x, disparo.y, 'particula-tint',
    {min: 120, max: 180},
    {min: Settings.pausas.duracionExplosion.enemigo, max: Settings.pausas.duracionExplosion.enemigo + 500},
    {start: 0.7, end: 0},
    // 0xffffff,
    // new Phaser.Display.Color(255, Phaser.Math.Between(50, 240), 0).color,
    disparo.tint,
    null, false, this
  );

  suma_puntos(disparo);
  // this.marcador.update(0, Settings.getPuntos());
  
  enemigo.setActive(false).setVisible(false).setX(-9999)
  disparo.setActive(false).setVisible(false).disableBody(true, true);
}

function particulas(x, y, particula, vel, span, size, color, sprite, bool, scene)
{
    const partis = scene.add.particles(x, y, particula, {
        speed: vel,
        lifespan: span,
        scale: size,
        tint: color,
        // gravityY: 200
        blendMode: 'ADD'
    });

    scene.time.delayedCall(Settings.pausas.duracionExplosion.enemigo, () =>
    {
      partis.stop();
    });

    if (bool) partis.startFollow(sprite);
}

function draw_explosionTimeout(scene, enemigo)
{
  Settings.explosionInvaders = scene.add.image(enemigo.x, enemigo.y, 'explosion');
  Settings.explosionInvaders.setTint(enemigo.tint).setScale(2).setAlpha(1);
  
  scene.tweens.add(
  {
    targets: Settings.explosionInvaders,
    alpha: 0,
    duration: Settings.pausas.duracionExplosion.enemigo - 100
  });
}

function suma_puntos(puntos)
{
    const bonus = Settings.getPuntos() + puntos.getData('puntos');
    Settings.setPuntos(bonus);
    // console.log(bonus, Settings.getPuntos());
}

function restar_vida()
{
    const actualizar = Settings.getVidas() - 1;
    Settings.setVidas(actualizar);
}

function play_sonidos(id, loop, volumen)
{
  id.volume = volumen;
  id.loop = loop;
  id.play();
}

export {
  colisionJugadorVsEnemigo,
  excepcionJugadorVsEnemigo,
  colisionDisparoVsEnemigo,
  inicia_disparo,
  play_sonidos
};
