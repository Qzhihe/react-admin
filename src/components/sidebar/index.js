import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    List,
    styled,
    Toolbar,
    Divider,
    Collapse,
    IconButton,
    createTheme,
    ListItemIcon,
    ListItemText,
    ThemeProvider,
    ListItemButton,
    Drawer as MuiDrawer,
} from '@mui/material';

import * as Icons from '@mui/icons-material';

import {
    ChevronLeft,
    ExpandLessOutlined,
    ExpandMoreOutlined,
} from '@mui/icons-material';

import { toggleOpen } from 'features/sidebarSlice';

const theme = createTheme();

const Sidebar = () => {
    const dispatch = useDispatch();
    const [fold, setFold] = React.useState(false);
    const open = useSelector(state => state.sidebar.open);
    const routes = useSelector(state => state.router.routes);

    return (
        <ThemeProvider theme={theme}>
            <Drawer variant="permanent" open={open}>
                <Toolbar sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: 1
                }}>
                    <IconButton onClick={() => setFold(false) ^ dispatch(toggleOpen())}><ChevronLeft fontSize='large' /></IconButton>
                </Toolbar>

                <Divider />

                <List component='nav'>
                    {
                        routes.map((route, outerIdx) => {
                            if (!route.children) {
                                return (
                                    <LinkListItem
                                        to={route.url}
                                        title={route.title}
                                        icon={route.icon}
                                        key={outerIdx}
                                    />
                                );
                            }

                            return (
                                <React.Fragment key={outerIdx}>
                                    <LinkListItem
                                        to={null}
                                        title={route.title}
                                        icon={route.icon}
                                        open={fold}
                                        onClick={() => setFold(!fold)}
                                        key={outerIdx}
                                    />
                                    <Collapse component='li' in={fold} timeout="auto" unmountOnExit>
                                        <List disablePadding>
                                            {
                                                route.children.map((item, innerIdx) => {
                                                    return (
                                                        <LinkListItem
                                                            sx={{ pl: 4 }}
                                                            to={item.url}
                                                            title={item.title}
                                                            icon={item.icon}
                                                            key={`${outerIdx}-${innerIdx}`}
                                                        />
                                                    );
                                                })
                                            }
                                        </List>
                                    </Collapse>
                                </React.Fragment>
                            );
                        })
                    }
                </List>
            </Drawer>
        </ThemeProvider>
    );
};

export default Sidebar;

// 二次封装 Drawer
const Drawer = styled(MuiDrawer, { shouldForwardProp: (props) => props !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            width: '20rem',
            position: 'relative',
            whiteSpace: 'nowrap',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            ...(!open && {
                overflowX: 'hidden',
                width: theme.spacing(7),
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        }
    })
);

// 二次封装 ListItemButton
const LinkListItem = (props) => {
    const {
        to,
        open,
        icon,
        title,
        ...others
    } = props;

    let headIcon = null;
    if (icon !== '') {
        const Icon = Icons[icon];
        headIcon = <Icon fontSize='large' />;
    }

    let tailIcon = null;
    if (open !== undefined) {
        tailIcon = open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />;
    }

    let component = 'div';
    if (to) {
        component = Link;
    }

    return (
        <li>
            <ListItemButton component={component} to={to} {...others}>
                {headIcon ? <ListItemIcon children={headIcon} /> : null}
                <ListItemText primary={title} />
                {tailIcon}
            </ListItemButton>
        </li>
    );
};