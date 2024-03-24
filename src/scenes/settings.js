
export class Settings
{
    static controlElegido = {
        mobile: true,
        teclado: false
    };

    static screen = {
        width: 800,
        height: 600
    };

    static nivelSuperado = false;
    static gameOver = false;

    static puntos = 0;
    static nivel = 1;
    static hi = 3000;

    static depth = {
        fondo: 0,
        disparoEnemigo: 10,
        disparo: 20,
        jugador: 40,
        enemigo: 50,
        explosiones: 60,
        marcadores: 110,
        textos: 120
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
}
