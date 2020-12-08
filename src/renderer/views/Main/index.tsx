import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useWordsModel from 'stores/useWordsModel';
import * as styles from './index.module.less';
import { Button, Typography } from 'antd';

const Main: FC<RouteComponentProps> = () => {
    const { words, setWords } = useWordsModel();
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
