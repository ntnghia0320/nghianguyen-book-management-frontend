import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip';
import userService from '../../services/user.service';
import getCurrentUser from '../../services/user-info';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: '#333333',
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
            wordWrap: 'break-word'
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 700,
        },
        buttonDialog: {
            '&:focus': {
                backgroundColor: '#b2b8e1',
            },
        },
    }),
);

export default function UserManagement() {
    const classes = useStyles();
    const [users, setUsers] = React.useState<User[]>([]);
    const [change, setChange] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [userId, setUserId] = React.useState(0);
    const [roleId, setRoleId] = React.useState(0);

    React.useEffect(() => {
        userService.getUsers().then(
            (res) => {
                setUsers(res);
            },
            (error) => {
                alert(error.message)
            }
        );

        console.log('edit post list');
    }, [change]);

    const reload = () => {
        setChange(!change);
    }

    const setRole = (userId: number, roleId: number) => {
        setUserId(userId);
        setRoleId(roleId === 1 ? 2 : 1);
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleSure = () => {
        userService.setRoleUser(userId, roleId).then(
            (res) => {
                reload();
            },
            (error) => {
                alert(JSON.stringify(error))
            }
        );
        setOpenDialog(false);
    }

    const handleNotSure = () => {
        setOpenDialog(false);
    }

    const enabledUser = (user: User, userId: number) => {
        user.enabled = !user.enabled;
        userService.updateUser(user, userId).then(
            (res) => {
                reload();
            },
            (error) => {
                alert(JSON.stringify(error))
            }
        );
    }

    return (
        <>
            <TableContainer>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Email <span>&emsp;</span></StyledTableCell>
                            <StyledTableCell align="right">Status <span>&emsp;</span></StyledTableCell>
                            <StyledTableCell align="right">Role <span>&emsp;</span></StyledTableCell>
                            <StyledTableCell align="right">Set Role <span>&emsp;</span></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length === 0 && (
                            <StyledTableRow>
                                <StyledTableCell align="center" colSpan={5}>Empty</StyledTableCell>
                            </StyledTableRow>
                        )}
                        {users.map((user) => (
                            getCurrentUser().userId !== user.id ? (
                                <StyledTableRow key={user.id}>
                                    <StyledTableCell component="th" scope="row">{`${user.firstName} ${user.lastName}`}</StyledTableCell>
                                    <StyledTableCell align="right">{user.email}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Tooltip title={user.enabled ? 'Disable User' : 'Enable User'}>
                                            <Button
                                                style={{ textTransform: 'none' }}
                                                onClick={() => enabledUser(user, Number(user.id))}
                                            >
                                                <Typography
                                                    color={user.enabled ? "primary" : "secondary"}
                                                    variant="subtitle1"
                                                    component="h2"
                                                >
                                                    {user.enabled ? 'Enabled' : 'Disabled'}
                                                </Typography>
                                            </Button>
                                        </Tooltip>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{user.role?.name}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Tooltip title={user.role?.id === 1 ? 'Set role admin' : 'Set role user'}>
                                            <Button
                                                onClick={() => setRole(Number(user.id), Number(user.role?.id))}
                                                aria-label="set-role"
                                                size="small"
                                            >
                                                {user.role?.id === 1 ? 'Set role admin' : 'Set role user'}
                                            </Button>
                                        </Tooltip>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ) : null
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Set role</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to set role?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.buttonDialog} onClick={handleNotSure} color="primary">
                        No
                    </Button>
                    <Button className={classes.buttonDialog} onClick={handleSure} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}