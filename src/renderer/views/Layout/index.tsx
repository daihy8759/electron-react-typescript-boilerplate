import logo from 'assets/img/logo.png';
import TitleBar from 'frameless-titlebar';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './index.less';

interface ILayoutProps extends RouteComponentProps {}

const Layout: React.FC<ILayoutProps> = props => {
    return (
        <div className={styles.container}>
            <TitleBar icon={logo} app="react" />
            {props.children}
        </div>
    );
};

export default Layout;
