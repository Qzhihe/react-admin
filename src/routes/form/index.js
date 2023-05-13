import dayjs from 'dayjs';
import * as React from 'react';

import {
    Card,
    Stack,
    Paper,
    Button,
    TextField,
    createTheme,
    ThemeProvider,
} from "@mui/material";

import {
    StaticDatePicker,
    StaticTimePicker,
    LocalizationProvider,
} from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme();

const Form = () => {
    const [formData, setFormData] = React.useState({
        name: 'foo',
        price: 3.14,
        label: '6',
        description: 'bar'
    });

    const handleInputChange = (ev) => {
        ev.preventDefault();

        const { name, value } = ev.target;
        setFormData((formData) => ({ ...formData, [name]: value }));
    };

    const handleFormSubmit = (ev) => {
        ev.preventDefault();

        console.log(formData);
    };

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ display: 'flex', justifyContent: 'space-around', padding: '2rem 0' }}>
                <form onSubmit={handleFormSubmit}>
                    <Stack spacing='2rem' direction='column' sx={{ width: '20rem' }}>
                        <TextField
                            required
                            name='name'
                            label='Name'
                            variant='outlined'
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            required
                            name='price'
                            label='Price'
                            variant='outlined'
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                        <TextField
                            required
                            name='label'
                            label='Label'
                            variant='outlined'
                            value={formData.label}
                            onChange={handleInputChange}
                        />
                        <TextField
                            name='description'
                            variant='outlined'
                            label='Description'
                            value={formData.description}
                            onChange={handleInputChange}
                        />

                        <Button variant='contained' type='submit'>Submit</Button>
                    </Stack>
                </form>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Card>
                        <StaticDatePicker sx={{ width: '20rem' }} />
                    </Card>

                    <Card>
                        <StaticTimePicker defaultValue={dayjs(new Date())} />
                    </Card>
                </LocalizationProvider>
            </Paper>
        </ThemeProvider>
    );
};

export default Form;