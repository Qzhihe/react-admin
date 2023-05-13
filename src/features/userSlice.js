import { request } from 'utils/request';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const doLogin = createAsyncThunk('user/login', async (userInfo) => {
    const res = await request({
        url: '/login',
        method: 'post',
        data: userInfo
    });
        
    return res;
});

export const doLogout = createAsyncThunk('user/logout', async (userInfo) => {
    const res = await request({
        url: '/logout',
        method: 'post',
        data: userInfo
    });
    
    return res;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: '',
        email: '',
        token: localStorage.getItem('token') ?? '',
        tokenExp: localStorage.getItem('tokenExp') ?? 0,
        isAuthenticated: !!localStorage.getItem('token'),
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(doLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state._id = action.payload._id;
                state.email = action.payload.email;
                state.token = action.payload.token;
                state.tokenExp = action.payload.exp;

                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('tokenExp', action.payload.exp);
            })
            .addCase(doLogout.fulfilled, (state) => {
                state._id = '';
                state.email = '';
                state.token = '';
                state.tokenExp = 0;
                state.isAuthenticated = false;

                localStorage.removeItem('token');
                localStorage.removeItem('tokenExp');
            });
    }
});

export default userSlice.reducer;