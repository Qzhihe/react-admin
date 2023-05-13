import * as React from 'react';

import { useSelector } from 'react-redux';

import {
    Box,
    Card,
    Stack,
    Paper,
    Table,
    Button,
    Drawer,
    TableRow,
    TextField,
    TableHead,
    TableCell,
    TableBody,
    Typography,
    createTheme,
    ThemeProvider,
    TablePagination,
    Divider,
} from "@mui/material";

const theme = createTheme();

const Items = () => {
    const [page, setPage] = React.useState(0);
    const rows = useSelector(state => state.item.items);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rowSelected, setRowSelected] = React.useState({});
    const [detailOpend, setDetailOpened] = React.useState(false);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = ev => {
        setRowsPerPage(parseInt(ev.target.value, 10));
        setPage(0);
    };

    const handleDetail = (ev) => {
        setDetailOpened(true);
        const selectedId = ev.currentTarget.getAttribute('data-item-id');
        setRowSelected(rows.find(item => item._id === selectedId));
    };

    const visibleRows = React.useMemo(() => {
        return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [rows, page, rowsPerPage]);

    const handleFormSubmit = () => {
        console.log(rowSelected);
    };

    const handleInputChange = (key, val) => {
        setRowSelected({ ...rowSelected, [key]: val });
    };

    return (
        <ThemeProvider theme={theme}>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Price(￥)</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            visibleRows.map(item => (
                                <TableRow
                                    key={item._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{item._id}</TableCell>
                                    <TableCell align="left">{item.name}</TableCell>
                                    <TableCell align="left">{item.price}</TableCell>
                                    <TableCell align="left">{item.description}</TableCell>
                                    <TableCell align="left">
                                        <Button variant='contained' onClick={handleDetail} data-item-id={item._id}>Detail</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Drawer
                anchor='right'
                open={detailOpend}
                onClose={() => setDetailOpened(false)}
                sx={{
                    zIndex: theme.zIndex.drawer + 2
                }}
                PaperProps={{ sx: { width: 576, padding: '2rem' } }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h3' sx={{ textAlign: 'center' }}>Detail</Typography>
                    <Button variant='contained' onClick={handleFormSubmit} sx={{ justifySelf: 'flex-end' }}>Commit</Button>
                </Box>

                <Divider variant='middle' sx={{ margin: '1rem 0' }} />

                <Card sx={{ padding: 1 }}>
                    <form>
                        <Stack spacing='1rem'>
                            <DetailItems data={rowSelected} changeHandler={handleInputChange} />
                        </Stack>
                    </form>
                </Card>
            </Drawer>
        </ThemeProvider>
    );
};

export default Items;

// 二次封装一个数据展示并可供修改的组件
const DetailItems = (props) => {
    const {
        data,
        changeHandler,
        ...others
    } = props;

    const keys = Object.keys(data);

    const handleChange = (ev) => {
        ev.preventDefault();

        const { name, value } = ev.currentTarget;
        changeHandler(name, value);
    };

    return (
        keys.map((item, idx) => {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }} key={idx} {...others}>
                    <Typography variant='h5' component='div' sx={{ padding: 1, mr: 1, color: '#777777' }}>{item}</Typography>
                    <TextField name={item} value={data[item]} sx={{ width: '100%' }} disabled={item === '_id'} onChange={handleChange} />
                </Box>

            );
        })
    );
};