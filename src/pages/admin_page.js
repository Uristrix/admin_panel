import React, {useEffect} from "react";
import M from 'materialize-css';
import {Header} from "../components/header";
import {Admin} from "../components/admin";
import {Footer} from "../components/footer";

import store from "../store/appStore";
const Admin_page = () =>
{

    useEffect(() =>
    {
        document.addEventListener('DOMContentLoaded', function() {
            M.Sidenav.init(null, document.querySelectorAll('.sidenav'), null);
        });
    }, [])

    return(
        <div>
            <Header func ={() => store.loginStatus = 'notAuth'}/>

            <main>
                <Admin/>
            </main>
            <Footer/>

        </div>
    )
}


export default  Admin_page;