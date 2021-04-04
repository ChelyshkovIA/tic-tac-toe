import {CONST} from '../CONST.js';
import {Section} from './Section.js';

export class PlayingField extends Section {

    constructor() {
        super();
    }

    /**
     * Renders playing field.
     * @param {number} parentId Parent element ID.
     */
    render(parentId) {
        super.render(parentId);

        this._ID = `playing-field__${Date.now()}`;

        this._domElement = this._createElement(
        `<div class="playing-field" id="${this._ID}">
            <div class="cell" data-position="00" id="tic-tac-toe-cell__0"></div>
            <div class="cell" data-position="01" id="tic-tac-toe-cell__1"></div>
            <div class="cell" data-position="02" id="tic-tac-toe-cell__2"></div>
            <div class="cell" data-position="10" id="tic-tac-toe-cell__3"></div>
            <div class="cell" data-position="11" id="tic-tac-toe-cell__4"></div>
            <div class="cell" data-position="12" id="tic-tac-toe-cell__5"></div>
            <div class="cell" data-position="20" id="tic-tac-toe-cell__6"></div>
            <div class="cell" data-position="21" id="tic-tac-toe-cell__7"></div>
            <div class="cell" data-position="22" id="tic-tac-toe-cell__8"></div>
        </div>`);
        
        this._parentElement.append(this._domElement);
        return this._ID;
    }

    onCellClick(callback) {
        this._domElement.addEventListener("click", (event) => {
            const target = event.target;
            
            if (!target.classList.contains('cell')) {
                return;
            }

            const coords = {
                rowIdx: target.dataset.position[0],
                cellIdx: target.dataset.position[1]
            }

            callback(coords);
        });
    }

    drawFigure(rowCoords, cellCoords, figure) {
        const cell = this
            ._domElement
            .querySelector(`.cell[data-position="${rowCoords}${cellCoords}"]`);
        
        figure === CONST.CROSS ? cell.innerText = "X" : cell.innerText = "O";    
    }

    clearField() {
        this
        ._domElement
        .querySelectorAll('.cell')
        .forEach(cell => {
            cell.innerText = "";
        });
    }
}