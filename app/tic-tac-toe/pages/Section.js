export class Section {
    constructor() {
        this._ID = undefined;
        this._domElement = undefined;
        this._parentElement = undefined;
        this._parentSectionId = undefined;
    }

    getId() {
        return this._ID;
    }

    getDomElement() {
        return this._domElement;
    }

    getParentElement() {
        return this._parentElement;
    }

    getParentSectionId() {
        return this._parentSectionId;
    }
    
    render(parentId) {
        this._parentSectionId = parentId;
        this._parentElement = document.querySelector(`#${parentId}`);
    }

    _createElement(htmlCode) {
        const element = document.createElement('div');
        element.innerHTML = htmlCode;
        return element.firstElementChild;
    }

    destroy() {}
}