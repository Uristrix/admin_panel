import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './style/index.css'

// import  'jquery/src/jquery'
// import 'semantic-ui-css/components/dropdown.css'
// //import 'semantic-ui-css/components/dropdown.min'
import App from './App';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />,
    </BrowserRouter>
)

