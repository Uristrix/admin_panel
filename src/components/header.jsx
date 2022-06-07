import React from "react";
import '../style/header.css'
import {useEffect} from 'react';
import M from "materialize-css";

export const Header = (props) =>
{
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
                        {props.func !== undefined &&
                            <li><a href="/#" onClick={props.func} >Exit</a></li>}
                    </ul>
                </nav>
            </div>

            <ul className="sidenav" id="mobile-demo">
                <li><a href="http://webrobo.mgul.ac.ru:3000/">webrobo</a></li>
                <li><a href="http://dbrobo.mgul.ac.ru/">dbrobo</a></li>
                <li><a href="http://dokuwiki.mgul.ac.ru/dokuwiki/doku.php">dokuwiki</a></li>
                <li><a href="https://rasp.msfu.ru/">Расписание</a></li>
                {props.func !== undefined &&
                    <li><a href="/#" onClick={props.func} >Exit</a></li>}
            </ul>
        </header>
    )
}