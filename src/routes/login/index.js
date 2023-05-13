import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    Avatar,
    Checkbox,
    Container,
    TextField,
    Typography,
    createTheme,
    CssBaseline,
    ThemeProvider,
    FormControlLabel,
} from '@mui/material';

import { LockOutlined } from '@mui/icons-material';

import Snackbar from 'components/snackbar';
import Copyright from 'components/copyright';

import { doLogin } from 'features/userSlice';

const theme = createTheme();

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formValue, setFormValue] = React.useState({
        email: 'Qzhihe12138@gmail.com',
        password: '794443',
        remeberMe: false
    });

    const [snackbarState, setSnackbarState] = React.useState({
        open: false,
        type: 'error',
        message: ''
    });

    const handleFormChange = ev => {
        const { name } = ev.target;
        const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;

        setFormValue({
            ...formValue,
            [name]: value
        });
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const { email, password } = formValue;

        const result = await dispatch(doLogin({ email, password }));
        const error = result.error;

        const errMap = {
            'ERR_NETWORK': '网络异常',
            'ERR_BAD_REQUEST': '用户名或密码错误'
        };

        if (error) {
            setSnackbarState({...snackbarState, open: true, message: errMap[error.code]});
        } else {
            navigate('/');
        }
    };

    // 提示框弹出后设置定时器 3s 后消失
    React.useEffect(() => {
        if (snackbarState.open) {
            const timer = setTimeout(() => {
                setSnackbarState({...snackbarState, open: false});
                clearTimeout(timer);
            }, 3000);
        }
    }, [snackbarState]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formValue.email}
                            onChange={handleFormChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formValue.password}
                            onChange={handleFormChange}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    name='remeberMe'
                                    color="primary"
                                    checked={formValue.remeberMe}
                                    onChange={handleFormChange}
                                />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>

            <Snackbar open={snackbarState.open} type={snackbarState.type} message={snackbarState.message} />
        </ThemeProvider>
    );
};

export default Login;