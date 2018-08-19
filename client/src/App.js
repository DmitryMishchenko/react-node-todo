import React from 'react';
import {Route} from 'react-router-dom';

import TopBar from './components/TopBar';
import TodoApp from './components/TodoApp';

const App = () => (
    <React.Fragment>
        <Route path="/" component={TopBar} />
        <Route path="/" component={TodoApp} />
    </React.Fragment>
);

export default App;
