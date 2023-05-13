import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

import {
    Link,
    Menu,
    styled,
    Avatar,
    Toolbar,
    MenuItem,
    Typography,
    IconButton,
    createTheme,
    ThemeProvider,
    AppBar as MuiAppBar,
    Breadcrumbs,
} from "@mui/material";

import {
    Menu as MenuIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';

import { doLogout } from 'features/userSlice';
import { toggleOpen as toggleDrawerOpen } from 'features/sidebarSlice';

const AppBar = styled(MuiAppBar, { shouldForwardProp: (props) => props !== 'open' })(
    ({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: '20rem',
            width: `calc(100% - 20rem)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        })
    })
);

const theme = createTheme();

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isSidebarOpen = useSelector(state => state.sidebar.open);
    const routesMap = useSelector(state => state.router.routesMap);

    const open = !!anchorEl;

    const handleClose = () => setAnchorEl(null);
    const handleClick = ev => setAnchorEl(ev.currentTarget);

    const splitRoute = (route) => {
        const breadcrumb = [];
        const parts = route.split('/').filter(item => !!item);

        for (let i = 0; i < parts.length; i++) {
            breadcrumb.push(`/${parts.slice(0, i + 1).join('/')}`);
        }

        return ['/', ...breadcrumb];
    };

    const handleLogout = async () => {
        const result = await dispatch(doLogout({ token: localStorage.getItem('token') }));

        if ('error' in result) {

        } else {
            navigate('/login');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="absolute" open={isSidebarOpen}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        children={<MenuIcon />}
                        aria-label="open drawer"
                        onClick={() => dispatch(toggleDrawerOpen())}
                        sx={{
                            marginRight: '3rem',
                            ...(isSidebarOpen && { display: 'none' }),
                        }}
                    />

                    <Breadcrumbs aria-label='breadcrumb' sx={{ color: '#ffffff' }}>
                        {
                            splitRoute(location.pathname).map((to, idx, it) => {
                                const last = idx === it.length - 1;

                                // 此处待优化
                                return last || to === '/examples' ? (
                                    <Typography color="rgba(255, 255, 255, .87)" key={to} >
                                        {routesMap[to]}
                                    </Typography>
                                ) : (
                                    <Link component={RouterLink} underline="hover" color="inherit" to={to} key={to}>
                                        {routesMap[to]}
                                    </Link>
                                );
                            })
                        }
                    </Breadcrumbs>

                    <IconButton
                        sx={{ ml: 'auto' }}
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                    </IconButton>
                </Toolbar>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleLogout}>
                        <IconButton children={<LogoutIcon fontSize="small" />} />
                        <Typography>Logout</Typography>
                    </MenuItem>
                </Menu>
            </AppBar>
        </ThemeProvider>
    );
};

export default Navbar;