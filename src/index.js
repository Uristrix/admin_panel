import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import {NotificationContainer} from "react-notifications";
import './style/index.css'

import App from './App';


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />,
        <NotificationContainer/>
    </BrowserRouter>
)

