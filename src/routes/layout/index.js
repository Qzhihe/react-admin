import * as React from 'react';

import { Outlet, useLocation, useLoaderData } from "react-router-dom";

import { Box, Toolbar, Container } from '@mui/material';

import Header from "components/header";
import Sidebar from "components/sidebar";
import { useDispatch } from 'react-redux';
import { updateItems } from 'features/itemSlice';

import { request } from 'utils/request';

// import store from 'store';

const Layout = () => {
    const data = useLoaderData();
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    React.useEffect(() => {
        dispatch(updateItems(data));
    }, [dispatch, data]);

    // console.log(store.getState());

    return (
        <Box sx={{
            display: 'flex'
        }}>
            <Header />
            <Sidebar />
            <Box component='main' sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}>
                {/* 其实是占位用的 Toolbar */}
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    {pathname === '/' ? <h1>Hi! This is a simple Home Page</h1> : <Outlet />}
                </Container>
            </Box>
        </Box >
    );
};

export default Layout;

export const LayoutLoader = async () => {
    try {
        const raw = await request({
            url: '/items',
            method: 'get'
        });

        return raw;
    } catch (err) {
        return [];
    }
};