import React from "react";

import {Header} from "../components/header";
import {Admin} from "../components/admin";
import {Footer} from "../components/footer";

const Admin_page = () =>
{
    return(
        <div className='page'>
            <Header/>
            <main>
                <Admin/>
            </main>
            <Footer/>
        </div>
    )
}

export default  Admin_page;