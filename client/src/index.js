import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import moment from 'moment';

import store from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles.css';

console.dir(moment)



ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App}/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();