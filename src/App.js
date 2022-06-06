import React from 'react';
import Login_page from "./pages/login_page";
import Admin_page from "./pages/admin_page"

import { observer } from "mobx-react-lite";
import { Route, Routes, Navigate } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import store from './store/appStore'

const App = observer(() =>
{
  return (
   <CookiesProvider>
     <Routes>
         {/* eslint-disable-next-line react/jsx-pascal-case */}
       <Route path= '/' element={ store.loginStatus === 'auth' ? <Navigate to='/admin_ticker' /> : <Login_page/>} />
         {/* eslint-disable-next-line react/jsx-pascal-case */}
       <Route path= '/admin_ticker' element={ store.loginStatus === 'auth' ? <Admin_page/> : <Navigate to='/' />} />
         {/* eslint-disable-next-line react/jsx-pascal-case */}
       <Route path = '*' element={ store.loginStatus === 'auth' ? <Admin_page/> : <Navigate to='/' />} />
     </Routes>
   </CookiesProvider>
  );
})

export default App;
