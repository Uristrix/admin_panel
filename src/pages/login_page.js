import React, {useEffect, useState} from "react";
import M from 'materialize-css';

import {Header} from "../components/header";
import {Footer} from "../components/footer";
import {Login} from "../components/login";
const Login_page = () =>
{


    useEffect(() =>
    {
        document.addEventListener('DOMContentLoaded', function() {
            M.Sidenav.init(null, document.querySelectorAll('.sidenav'), null);
        });
    }, [])

    return(
        <div>
            <Header/>

            <main>
                <Login/>
            </main>

            <Footer/>
        </div>
    )
}

export default  Login_page;