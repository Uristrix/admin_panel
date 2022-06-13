import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";
import { observer } from "mobx-react-lite";
import '../style/login.css'
import store from "../store/appStore";
import {NotificationManager} from "react-notifications";
//import {useCookies} from "react-cookie";

const _login = process.env.REACT_APP_LOGIN
const _password = process.env.REACT_APP_PASSWORD

export const Login = observer(() =>
{
    const { register, handleSubmit } = useForm();
    const [passwordShown, setPasswordShown] = useState('password');
    const [error_login, setError] = useState(false)
    //const [cookies, setCookie] = useCookies(["ticker"]);
    const updateError = (state) => setError(state)
    const togglePasswordVisiblity = () => setPasswordShown(passwordShown === 'password'? 'text': 'password');

    const onSubmit = (data) =>
    {

        if(data['login'] === _login && data['password'] === _password)
        {
            store.loginStatus = 'auth'
            store.pageStatus = 'admin'
            //setCookie('ticker', data['login']+'|'+data['password'])
        }

        else
        {
            updateError(true)
            NotificationManager.error('Неверный логин или пароль', '', 1000)
        }

    }

    useEffect(
        () => {
            if (error_login === true)
                setTimeout( () => updateError(false), 1000)
        }
    , [error_login])

    return(
        <form className= {'login' + (error_login ? ' error_login': '')} onSubmit={handleSubmit(onSubmit)}>
            <h3>Login</h3>

            <div className='form_elem'>
                <input {...register('login')} placeholder="Login"
                       //defaultValue={}
                />
            </div>

            <div className='form_elem'>
                <input {...register('password')}
                       placeholder="Password"
                       autoComplete="on"
                       //defaultValue={}
                       type={passwordShown}/>
                <FontAwesomeIcon onClick={togglePasswordVisiblity}
                                 className='icon'
                                 icon={passwordShown === 'password'? faEye: faEyeSlash}
                />
            </div>
            <button className='button' type='submit'>Login</button>
        </form>
    )
})