import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.less';
import MainRouter from './routes';

const App = () => {
    return <HashRouter>{MainRouter}</HashRouter>;
};

export default App;
