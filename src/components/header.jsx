import React from "react";
import '../style/header.css'
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from 'react';
import M from "materialize-css";
import {observer} from "mobx-react-lite";
import store from '../store/appStore'
export const Header = observer(() =>
{
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() =>
    {
            let elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems);
    }, [])
    return(
        <header>
            <div className="navbar-fixed">
                <nav className="nav-wrapper bar">
                    <a href="/#" data-target="mobile-demo" className="sidenav-trigger"><i
                        className="material-icons" style={{color:'black'}}>menu</i></a>

                    <ul id = 'bar' className='right hide-on-med-and-down'>
                        <li><a href="http://webrobo.mgul.ac.ru:3000/">webrobo</a></li>
                        <li><a href="http://dbrobo.mgul.ac.ru/">dbrobo</a></li>
                        <li><a href="http://dokuwiki.mgul.ac.ru/dokuwiki/doku.php">dokuwiki</a></li>
                        <li><a href="https://rasp.msfu.ru/">Расписание</a></li>

                        {location.pathname !== '/message' &&
                            <li onClick={ () => {navigate('/message') } }>
                                <a href='#'>Добавление сообщения</a>
                            </li>}

                        {location.pathname === '/message' &&
                            <li onClick={
                                () => {store.loginStatus === 'auth'? navigate('/admin_ticker') : navigate('/login')}}>
                                <a href='#'>Назад</a>
                            </li>}

                        {location.pathname === '/admin_ticker' &&
                            <li onClick={() => {store.pageStatus = 'login';store.loginStatus = 'notAuth';}}>
                                <a href="#">Выход</a>
                            </li>}
                    </ul>
                </nav>
            </div>

            <ul className="sidenav" id="mobile-demo">
                <li><a href="http://webrobo.mgul.ac.ru:3000/">webrobo</a></li>
                <li><a href="http://dbrobo.mgul.ac.ru/">dbrobo</a></li>
                <li><a href="http://dokuwiki.mgul.ac.ru/dokuwiki/doku.php">dokuwiki</a></li>
                <li><a href="https://rasp.msfu.ru/">Расписание</a></li>

                {location.pathname !== '/message' &&
                    <li onClick={ () => {navigate('/message') } }>
                        <a href='#'>Добавление сообщения</a>
                    </li>}

                {location.pathname === '/message' &&
                    <li onClick={
                        () => {store.loginStatus === 'auth'? navigate('/admin_ticker') : navigate('/login')}}>
                        <a href='#'>Назад</a>
                    </li>}

                {location.pathname === '/admin_ticker' &&
                    <li onClick={() => {store.pageStatus = 'login';store.loginStatus = 'notAuth';}}>
                        <a href="#">Выход</a>
                    </li>}
            </ul>
        </header>
    )
})