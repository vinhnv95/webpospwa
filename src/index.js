import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import routes from './routes';
import 'rxjs';

import configureStore from './store/configureStore';
import {Provider} from 'react-redux';

localStorage.setItem('corsUrl', 'https://vinh-cors.herokuapp.com/');

const store = configureStore();

const appRoot = (
    <Provider store={store}>
        {routes}
    </Provider>
);

ReactDOM.render(appRoot, document.getElementById('root'));
registerServiceWorker();
