import {CONST} from './../CONST.js';
import {Section} from './Section.js';

export class Menu extends Section {

    constructor() {
        super();

        this._startGameButtonId = 'start-game-button';
        this._gameFormId = 'game-form';
    }

    /**
     * Renders game menu.
     * @param {number} parentId Parent element ID.
     */
    render(parentId) {
        super.render(parentId);

        this._ID = `playing-field__${Date.now()}`;
        this._domElement = this._createElement(
        `<div class="menu" id="${this._ID}">
            <form id="${this._gameFormId}">
                <p>Choose game figure:</p>

                <div class="form-section">
                    <input type="radio" value="${CONST.CROSS}" checked name="game-mode" id="game-mode-cross"/>
                    <label for="game-mode-cross">Crosses</label>
                </div>

                <div class="form-section">
                    <input type="radio" value="${CONST.CIRCLE}" name="game-mode" id="game-mode-circle"/>
                    <label for="game-mode-circle">Circles</label>
                </div>

                <input value="Start" type="button" id="${this._startGameButtonId}"/>
            </form>
        </div>`);

        this._parentElement.append(this._domElement);
        return this._ID;
    }

    /**
     * Triggers on game start.
     * @param {Function} callback Callback function.
     */
    onGameStart(callback) {
        const form = this._domElement.querySelector(`#${this._gameFormId}`);
        const startGameButton = this._domElement.querySelector(`#${this._startGameButtonId}`);
        
        startGameButton.addEventListener("click", () => {
            const gameMode = form['game-mode'].value;
            callback(gameMode)
        });
    }
}