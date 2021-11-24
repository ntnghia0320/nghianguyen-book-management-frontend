import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbars({ active, status, autoHideDuration, message }: PropSnackBar) {
    const [open, setOpen] = React.useState(false);

    React.useEffect(
        () => {
            if (message !== '') {
                setOpen(true);
            }
        },
        [active, message]
    );

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={status}>
                {message}
            </Alert>
        </Snackbar>
    );
}
