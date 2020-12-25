import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </ConfigProvider>,
    document.getElementById('app')
);
