import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import FirstPage from './pages/FirstPage/FirstPage';
import Login from './pages/Login/Login';
import Checkout from './pages/Checkout/Checkout';

const routes = (
    <HashRouter>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route path='/firstPage' component={FirstPage}/>
            <Route path='/login' component={Login}/>
            <Route path='/checkout' component={Checkout}/>
        </Switch>
    </HashRouter>
);

export default routes;