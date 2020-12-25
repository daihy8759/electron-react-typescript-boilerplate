import { wordState } from '@/stores/home';
import { Button, Typography } from 'antd';
import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as styles from './index.module.less';

const Main: FC<RouteComponentProps> = () => {
    const [words, setWords] = useRecoilState(wordState);
    return (
        <div className={styles.default.container}>
            <Button
                type="primary"
                onClick={() => {
                    setWords('Hello World !');
                }}>
                Greeting
            </Button>
            {words && <Typography>{words}</Typography>}
        </div>
    );
};

export default Main;
