import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import routes from './routes';

localStorage.setItem('corsUrl', 'https://vinh-cors.herokuapp.com/');

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
