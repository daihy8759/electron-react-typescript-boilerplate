import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { StoreProvider } from './context';

ReactDOM.render(
    <StoreProvider>
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>
    </StoreProvider>,
    document.getElementById('app')
);
