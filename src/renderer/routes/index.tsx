import Layout from '@/views/Layout';
import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

const { Suspense } = React;

function LazyComponent(Component: any) {
    return (props: any) => (
        <Suspense fallback={<div />}>
            <Component {...props} />
        </Suspense>
    );
}

const Main = React.lazy(() => import('views/Main'));

const MainLayout = withRouter((props: any) => <Layout {...props} />);

const MainRouter = (
    <MainLayout>
        <Switch>
            <Route exact path="/" component={LazyComponent(Main)} />
        </Switch>
    </MainLayout>
);

export default MainRouter;
