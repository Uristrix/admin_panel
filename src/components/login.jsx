import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";
import { observer } from "mobx-react-lite";
import '../style/login.css'
import store from "../store/appStore";

const _login = process.env.REACT_APP_LOGIN
const _password = process.env.REACT_APP_PASSWORD

export const Login = observer(() =>
{
    const { register, handleSubmit } = useForm();
    const [passwordShown, setPasswordShown] = useState('password');
    const [error_login, setError] = useState(false)

    const updateError = (state) => setError(state)
    const togglePasswordVisiblity = () => setPasswordShown(passwordShown === 'password'? 'text': 'password');

    const onSubmit = (data) =>
    {

        if(data['login'] === _login && data['password'] === _password)
            store.loginStatus = 'auth'

        else
            updateError(true)
        console.log(store.loginStatus)
    }

    useEffect(
        () => {
            if (error_login === true)
                setTimeout( () => updateError(false), 1000)
        }
    , [error_login])

    return(
        <form className= {'login' + (error_login ? ' error': '')} onSubmit={handleSubmit(onSubmit)}>
            <h3>Login</h3>

            <div className='form_elem'>
                <input {...register('login')} placeholder="Login"/>
            </div>

            <div className='form_elem'>
                <input {...register('password')}
                       placeholder="Password"
                        autoComplete="on"
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