import {makeAutoObservable} from "mobx";

class store
{
    _loginStatus = 'notAuth'; //'notAuth', 'auth'
    _page = 'login' //admin, message
    _massageN = []
    _massageS = []
    constructor() { makeAutoObservable(this) }

    set loginStatus(status) { this._loginStatus = status }
    get loginStatus() { return this._loginStatus }

    set pageStatus(status) { this._page = status }
    get pageStatus() { return this._page }

    updateN(index, state){this._massageN[index]['selected'] = state;}
    updateS(index, state){this._massageS[index]['selected'] = state;}

    set massageN(data) { this._massageN = data }
    set massageS(data) { this._massageS = data }

    get massageN() { return this._massageN }
    get massageS() { return this._massageS }
}

export default new store()
