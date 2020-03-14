import { observer } from 'mobx-react-lite';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface MainProps extends RouteComponentProps {}

const Main: React.FC<MainProps> = observer(() => {
    return <div>hello world</div>;
});

export default Main;
