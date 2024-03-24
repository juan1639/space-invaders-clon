
export class Settings
{
    static controlElegido = {
        mobile: true,
        teclado: false
    };

    static screen = {
        width: 800,
        height: 600,
        numberWidths: 4,
        numberHeights: 1
    };

    static animaInicial = true;
    static gameOver = false;

    static puntos = 0;
    static incPuntos = 0;
    static hi = 238;

    static aplausos = {
        abucheos: 200,
        aplausos: 400
    };

    static pausas = {
        flechaClavada: 2800,
        showTxtInicial: 15000
    };

    static jugador = {
        offSetX: 10,
        offSetY: 95
    };

    static flecha = {
        nroFlechas: 10,
        lanzamientoNro: 0,
        changeCam: false,
        iniX: -200,
        iniY: 350,
        offSetX: 12,
        offSetY: 80
    };

    static diana = {
        nroElementos: 16,
        x: Settings.screen.width * (Settings.screen.numberWidths - 2),
        y: 420,
        ancho: 2,
        alto: 200,
        scaleX: 1,
        scaleY: 1
    };

    static barraFuerza = {
        x: 0,
        y: 60,
        ancho: 400,
        alto: 30,
        padding: 7
    };

    static depth = {
        fondoScroll: 0,
        tileSuelo: 45,
        jugador: 20,
        arco: 30,
        flecha: 35,
        diana: 40,
        marcadores: 50,
        textos: 60
    };

    static cameraScores = {
        x: 0,
        y: 0,
        ancho: 800,
        alto: 45,
        scrollX: 0,
        scrollY: -50
    };

    // -----------------------------------------------
    static isAnimaInicial()
    {
        return Settings.animaInicial;
    }

    static isGameOver()
    {
        return Settings.gameOver;
    }

    static getScreen()
    {
        return Settings.screen;
    }

    static getPuntos()
    {
        return Settings.puntos;
    }

    static getIncPuntos()
    {
        return Settings.incPuntos;
    }

    static getRecord()
    {
        return Settings.hi;
    }

    static getAplausos()
    {
        return Settings.aplausos;
    }

    static getCameraScores()
    {
        return Settings.cameraScores;
    }

    static getFlechaNro()
    {
        return Settings.flecha.lanzamientoNro;
    }

    // -----------------------------------------------
    static setAnimaInicial(bool)
    {
        Settings.animaInicial = bool;
    }

    static setGameOver(bool)
    {
        Settings.gameOver = bool;
    }

    static setPuntos(ptos)
    {
        Settings.puntos = ptos;
    }

    static setIncPuntos(incPtos)
    {
        Settings.incPuntos = incPtos;
    }

    static setRecord(hiScore)
    {
        Settings.hi = hiScore;
    }

    static setCameraScores(x, y, ancho, alto, scrollX, scrollY)
    {
        Settings.cameraScores.x = x;
        Settings.cameraScores.y = y;
        Settings.cameraScores.ancho = ancho;
        Settings.cameraScores.alto = alto;
        Settings.cameraScores.scrollX = scrollX;
        Settings.cameraScores.scrollY = scrollY;
    }

    static setFlechaNro(reset)
    {
        Settings.flecha.lanzamientoNro = reset;
    }
}
