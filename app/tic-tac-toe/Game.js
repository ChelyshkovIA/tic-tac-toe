import {CONST} from './CONST.js';
import {Window} from './pages/Window.js';
import {Menu} from './pages/Menu.js';
import {PlayingField} from './pages/PlayingField.js';
import {Person} from './roles/Person.js';
import {Machine} from './roles/Machine.js';

export class Game {
    constructor(sectionId) {
        this._sectionId = sectionId;

        this.appWindow = new Window();
        this.menu = new Menu();
        this.playingField = new PlayingField();
        this.machinePlayer = new Machine();
        this.userPlayer = new Person('Ilya');

        this.gameOptions = {
            step: 0,
            gameStart: false,
            userFigure: undefined,
            gameState: this._renderGameState()
        }
    }

    _renderGameState() {
        function Cell ()  {
            this.state = CONST.EMPTY;
        }

        const fieldState = new Array(3);

        for (let i = 0; i < fieldState.length; i++) {
            fieldState[i] = new Array(3);
            for (let j = 0; j < fieldState[i].length; j++) {
                fieldState[i][j] = new Cell();
            }
        }

        return fieldState;
    }

    /**
     * Connects app-styles to the document.
     */
    _connectStyles() {
        const styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.href = 'tic-tac-toe/styles/GAME.css';

        document.head.append(styles);
    }

    /**
     * Starts game;
     */
    start() {
        this._connectStyles();

        this.appWindow.render(this._sectionId);
        this.playingField.render(this.appWindow.getId());
        this.menu.render(this.appWindow.getId());

        this.menu.onGameStart(this._startGame.bind(this));
    }

    /**
     * Starts game.
     * @param {string} currentFigure Game Mode (Circles or Crosses)
     */
    _startGame(currentFigure) {
        if (this.gameOptions.gameStart) {
            return;
        }

        this.gameOptions.gameStart = true;

        this.playingField.onCellClick(this._handlePlayerMoving.bind(this));

        if (currentFigure === CONST.CROSS) {
            this.gameOptions.userFigure = CONST.CROSS;
        } else {
            this.gameOptions.userFigure = CONST.CIRCLE;
            const coords = this.machinePlayer.makeMove(this.gameOptions.gameState);
            this.playingField.drawFigure(coords.rowIdx, coords.cellIdx, CONST.CROSS);
        }
    }

    /**
     * Handles player moving.
     * @param {string} cellPosition Current cell position.
     */
    _handlePlayerMoving(cellPosition) {
        if (this.gameOptions.step >= 9 || this.gameOptions.gameStart === false) {
            this.gameOptions.step = 0;
            this._endGame();
            return;
        }

        const userFigure = this.gameOptions.userFigure;
        this.playingField.drawFigure(cellPosition.rowIdx, cellPosition.cellIdx, userFigure);

        let machineFigure;
        if (userFigure === CONST.CROSS) {
            machineFigure = CONST.CIRCLE;
        } else {
            machineFigure = CONST.CROSS;
        }

        this._updateGameState(cellPosition.rowIdx, cellPosition.cellIdx, userFigure);

        if (this.gameOptions.step >= 9) {
            this.gameOptions.step = 0;
            this._endGame();
            return;
        }

        const coords = this.machinePlayer.makeMove(this.gameOptions.gameState);
        this.playingField.drawFigure(coords.rowIdx, coords.cellIdx, machineFigure);

        this._updateGameState(coords.rowIdx, coords.cellIdx, machineFigure);
    }

    _updateGameState(row, cell, value) {
        this.gameOptions.step++;
        this.gameOptions.gameState[row][cell] = value;
    }

    _endGame() {
        this.gameOptions.step = 0;
        this.gameOptions.gameState = this._renderGameState();
        this.playingField.clearField();
        this.gameOptions.gameStart = false;
    }
}