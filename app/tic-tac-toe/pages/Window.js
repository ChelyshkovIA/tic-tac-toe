import {Section} from './Section.js';

export class Window extends Section {
    /**
     * Renders main game window.
     * @param {number} parentId Parent element ID.
     */
    render(parentId) {
        super.render(parentId);

        this._ID = `window__${Date.now()}`;
        this._domElement = this._createElement(`<div class="window" id="${this._ID}"></div>`);
        this._parentElement.append(this._domElement);

        return this._ID;
    }
}