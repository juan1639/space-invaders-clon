
export class Settings
{
    static controlElegido = {
        mobile: false,
        teclado: true
    };

    static screen = {
        width: 800,
        height: 600
    };

    static nivelSuperado = false;
    static gameOver = false;

    static puntos = 0;
    static nivel = 1;
    static hi = 48000;
    static vidas = 3;

    static jugador =
    {
        posIniX: Math.floor(Settings.screen.width / 2),
        posIniY: Math.floor(Settings.screen.height / 1.05),
        velX: 520,
        acelX: 500,
        velY: 0
    };

    static disparo =
    {
        NRO_MAX_DISPAROS: 3,
        VelY: -500
    }

    static disparoEnemigo =
    {
        NRO_MAX_DISPAROS: 9,
        velY: 100
    }

    static incGodownInvaders =
    [
        2, 2, 4, 5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 30, 30, 30, 30, 30, 30, 30
    ];

    static coloresInvaders =
    {
        rojo: 0xff2211,
        verde: 0x11ff11,
        amarillo: 0xeeff00,
        disparo: {
            naranja: 0xcc9911
        }
    };

    static explosionInvaders = null;

    static nodriza =
    {
        aparecer: 15000,
        posIniX: -100,
        posIniY: 50,
        posIniXRight: Settings.screen.width + 100,
        velX: 150
    };

    static pausas =
    {
        revivir: 4000,
        invisible: 3000,
        duracionExplosion: {
            jugador: 1000,
            enemigo: 400
        }
    };

    static depth = {
        fondo: 0,
        disparoEnemigo: 10,
        disparo: 20,
        jugador: 40,
        enemigo: 50,
        explosiones: 60,
        marcadores: 110,
        textos: 120,
        mobileControls: 150
    };

    // --- Getters ---
    static isNivelSuperado()
    {
        return Settings.nivelSuperado;
    }

    static isGameOver()
    {
        return Settings.gameOver;
    }

    static getPuntos()
    {
        return Settings.puntos;
    }

    static getNivel()
    {
        return Settings.nivel;
    }

    static getRecord()
    {
        return Settings.hi;
    }

    static getVidas()
    {
        return Settings.vidas;
    }

    static getIncGodownInvaders()
    {
        return Settings.incGodownInvaders;
    }

    // --- Setters ---
    static setNivelSuperado(bool)
    {
        Settings.nivelSuperado = bool;
    }

    static setGameOver(bool)
    {
        Settings.gameOver = bool;
    }

    static setPuntos(ptos)
    {
        Settings.puntos = ptos;
    }

    static setNivel(level)
    {
        Settings.nivel = level;
    }

    static setRecord(hiScore)
    {
        Settings.hi = hiScore;
    }

    static setVidas(lifes)
    {
        Settings.vidas = lifes;
    }
}
