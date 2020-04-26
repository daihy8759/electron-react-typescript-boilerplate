import logo from 'assets/img/logo.png';
import TitleBar from 'frameless-titlebar';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './index.less';
import { ipcRenderer, remote } from 'electron';

interface ILayoutProps extends RouteComponentProps {}

const Layout: React.FC<ILayoutProps> = props => {
    const currentWindow = remote.getCurrentWindow();
    const [maximize, setMaximize] = useState(false);

    const resizeMaximize = () => {
        if (maximize) {
            ipcRenderer.send('resize-default');
        } else {
            currentWindow.maximize();
        }
        setMaximize(!maximize);
    };

    return (
        <div className={styles.container}>
            <TitleBar
                iconSrc={logo}
                title="React"
                // @ts-ignore
                platform={process.platform}
                onClose={() => currentWindow.close()}
                onMinimize={() => currentWindow.minimize()}
                onMaximize={() => currentWindow.maximize()}
                onDoubleClick={resizeMaximize}
            />
            {props.children}
        </div>
    );
};

export default Layout;
