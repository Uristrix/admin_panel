import React from "react";
import '../style/exit.css'
import {observer} from "mobx-react-lite";
import store from '../store/appStore'

export const Exit = observer(() =>
{
    return(
        <button className='exit' onClick= {() => store.loginStatus = 'notAuth'}>
            EXIT
        </button>
    )
})