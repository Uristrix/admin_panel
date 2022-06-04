import React, {useEffect, useState} from "react";
import M from 'materialize-css'

import {Header} from "../components/header";
import {Footer} from "../components/footer";
import {Login} from "../components/login";
import store from "../store/appStore";
const Login_page = () =>
{

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