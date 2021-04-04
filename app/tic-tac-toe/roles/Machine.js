import {CONST} from '../CONST.js';
import {Player} from './Player.js';

export class Machine extends Player {
    constructor() {
        super("Computer");
    }

    /**
     * 
     * @param {Object} gameState 
     * @returns {Object{rowIdx, cellIdx}}
     */
    makeMove(gameState) {
        super.makeMove(gameState);

        const emptyCells = [];
        gameState.forEach((row, rowIdx) => {
            row.forEach((cell, cellIdx) => {
                if (cell.state === CONST.EMPTY) {
                    emptyCells.push({rowIdx, cellIdx});
                }
            });
        });
        
        return emptyCells[Math.floor(Math.random() * (emptyCells.length - 1))];
    }
}