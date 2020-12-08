import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>,
    document.getElementById('app')
);
