import { Spin } from 'antd';
import * as React from 'react';

interface LoadingProps {
    visible: boolean;
    text: string;
}

const Loading: React.SFC<LoadingProps> = props => {
    const { visible, text } = props;

    return <Spin spinning={visible} tip={text} />;
};

export default Loading;
