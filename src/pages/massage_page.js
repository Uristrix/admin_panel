import React from "react";

import {Header} from "../components/header";
import {Footer} from "../components/footer";
import {Massage} from "../components/massage";

const Massage_page = () =>
{
    return(
        <div>
            <Header/>

            <main>
                <Massage/>
            </main>

            <Footer/>
        </div>
    )
}

export default  Massage_page;