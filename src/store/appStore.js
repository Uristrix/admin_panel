import {makeAutoObservable} from "mobx";

class store
{
    _loginStatus = 'notAuth'; //'notAuth', 'auth'
    constructor() { makeAutoObservable(this) }

    set loginStatus(status) { this._loginStatus = status }
    get loginStatus() { return this._loginStatus }
}

export default new store()
