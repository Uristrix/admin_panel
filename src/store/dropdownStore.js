import {makeAutoObservable} from "mobx";

class ddStore
{
    _type = '';
    _room = '';
    _type2 = '';
    _color = '';
    constructor() { makeAutoObservable(this) }

    set type(state) { this._type = state }
    set room(state) { this._room = state }
    set type2(state) { this._type2 = state }
    set color(state) { this._color = state }

    get type() { return this._type }
    get room() { return this._room }
    get type2() { return this._type2 }
    get color() { return this._color }

}

export default new ddStore()