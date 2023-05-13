import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, useNavigate } from 'react-router-dom';

import Form from 'routes/form';
import Login from 'routes/login';
import Table from 'routes/table';
import NotFoundPage from 'routes/404';
import Dashboard from 'routes/dashboard';
import Layout, { LayoutLoader } from 'routes/layout';

import { doLogout } from 'features/userSlice';

export const PrivateRoute = (props) => {
    const {
        element,
    } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token);
    const tokenExp = useSelector(state => state.user.tokenExp);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    // 毫秒 -> 秒
    const curTime = Date.now() / 1000;

    React.useEffect(() => {
        if (!isAuthenticated) {
            console.log('Error: Unauthorized');
            return navigate('/login');
        }

        if (curTime > tokenExp) {
            dispatch(doLogout({ token }));
            return navigate('/login');
        }
    }, [token, tokenExp, curTime, isAuthenticated, navigate, dispatch]);

    return isAuthenticated ? element : null;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute element={<Layout />} />,
        errorElement: <NotFoundPage />,
        loader: LayoutLoader,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />,
                children: [
                    {
                        path: 'important',
                        element: <Dashboard />
                    }
                ]
            },
            {
                path: 'examples',
                children: [
                    {
                        path: 'table',
                        element: <Table />,
                        // loader: TableLoader
                    },
                ]
            },
            {
                path: 'form',
                element: <Form />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
]);

export default router;