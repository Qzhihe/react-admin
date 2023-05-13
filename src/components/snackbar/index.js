import * as React from 'react';

import {
    Alert,
    Snackbar as MuiSnackbar,
} from '@mui/material';

const Snackbar = (props) => {
    const {
        open,
        type,
        message,
    } = props;

    const [innerOpen, setInnerOpen] = React.useState(open);

    React.useEffect(() => {
        setInnerOpen(open);
    }, [open]);

    return (
        <MuiSnackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={innerOpen}
        >
            <Alert severity={type} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </MuiSnackbar>
    );
};

export default Snackbar;