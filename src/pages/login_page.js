import React from "react";

import {Header} from "../components/header";
import {Footer} from "../components/footer";
import {Login} from "../components/login";
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