import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import FirstPage from './FirstPage/FirstPage';
import Login from './Login/Login';
import Checkout from './Checkout/Checkout';

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