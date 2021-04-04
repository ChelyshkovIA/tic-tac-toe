export class Player {

    constructor(name) {
        this._name = name;
    }

    getName() {
        return this._name;
    }

    makeMove(gameState) {
        console.log(this._name);
    }
}