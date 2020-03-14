import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter } from 'react-router-dom';
import './App.less';
import MainRouter from './routes';

const App: React.SFC = () => {
    return <HashRouter>{MainRouter}</HashRouter>;
};

export default hot(App);
