import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import { Backdrop, Fade, Modal } from '@material-ui/core';
import { NavLink, useLocation } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AddBook from '../common/AddBook';
import Typography from '@material-ui/core/Typography';
import bookService from '../../services/book.service';
import EditBook from '../common/EditBook';
import TablePagination from '@material-ui/core/TablePagination';

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
            minWidth: 800,
        },
        tableContainer: {
            borderRadius: 0,
        },
        fab: {
            margin: theme.spacing(2),
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            [theme.breakpoints.down('sm')]: {
                width: '90%',
            },
            width: '70%',
            overflowY: "auto",
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #333333',
            borderRadius: 8,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            '&::-webkit-scrollbar': {
                width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                outline: '1px solid slategrey'
            }
        },
        buttonDialog: {
            '&:focus': {
                backgroundColor: '#e0dede96',
            },
        },
    }),
);

export default function MyBooksList() {
    const classes = useStyles();
    const [isModalAddBookOpen, setIsModalAddBookOpen] = React.useState(false);
    const [isModalEditBookOpen, setIsModalEditBookOpen] = React.useState(false);
    const [bookId, setBookId] = React.useState(-1);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalRows, setTotalRows] = React.useState(0);
    const [books, setBooks] = React.useState<Book[]>([]);
    const param = useLocation().search.substr(1);
    const [change, setChange] = React.useState(false);

    React.useEffect(() => {
        bookService.getBooksByUserId(page, rowsPerPage, param).then(
            (res) => {
                setBooks(res.items);
                setTotalRows(res.totalResults);
            },
            (error) => {
                alert(error.response.data.message)
            }
        );
        console.log('my book list');
    }, [page, rowsPerPage, param, change]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const openModalAddBook = () => {
        setIsModalAddBookOpen(true);
    };

    const closeModalAddBook = () => {
        setIsModalAddBookOpen(false);
    };

    const openModalEditBook = (bookId: number) => {
        setBookId(bookId);
        setIsModalEditBookOpen(true);
    };

    const closeModalEditBook = () => {
        setIsModalEditBookOpen(false);
    };

    const deleteBook = (bookId: any) => {
        setBookId(bookId);
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleSure = () => {
        bookService.deleteBook(bookId).then(
            (res) => {
                reload();
            },
            (error) => {
                alert(error.message)
            }
        );
        setOpenDialog(false);
    }

    const handleNotSure = () => {
        setOpenDialog(false);
    }

    const reload: Reload = () => {
        setChange(!change);
        closeModalAddBook();
        closeModalEditBook();
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, totalRows - page * rowsPerPage);

    return (
        <>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table
                    aria-label="sticky table"
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">
                                <Typography variant="h5" noWrap>
                                    My Book List
                                    <Button
                                        style={{ textTransform: 'none', float: 'right' }}
                                        variant="outlined"
                                        color="inherit"
                                        onClick={openModalAddBook}
                                    >
                                        <AddIcon />
                                        Add Book
                                    </Button>
                                </Typography>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table
                    className={classes.table}
                    stickyHeader
                    aria-label="sticky table"
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell align="right">Author </StyledTableCell>
                            <StyledTableCell align="right">Status </StyledTableCell>
                            <StyledTableCell align="right">View <span>&emsp;</span></StyledTableCell>
                            <StyledTableCell align="right">Edit <span>&emsp;</span></StyledTableCell>
                            <StyledTableCell align="right">Delete <span>&emsp;</span></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.length === 0 && (
                            <StyledTableRow>
                                <StyledTableCell align="center" colSpan={6}>Empty</StyledTableCell>
                            </StyledTableRow>
                        )}
                        {books.map((book) => (
                            <StyledTableRow key={book.id}>
                                <StyledTableCell component="th" scope="row">{book.title}</StyledTableCell>
                                <StyledTableCell align="right">{book.author}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Typography
                                        color={book.enabled ? "primary" : "secondary"}
                                        variant="subtitle1"
                                        component="h2"
                                    >
                                        {book.enabled ? 'Enabled' : 'Disabled'}
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Tooltip title="View">
                                        <IconButton
                                            aria-label="view"
                                            component={NavLink}
                                            to={`/book/${book.id}`}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Tooltip title="Edit">
                                        <IconButton
                                            onClick={() => openModalEditBook(Number(book.id))}
                                            aria-label="edit"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Tooltip title="Delete">
                                        <IconButton
                                            onClick={() => deleteBook(book.id)}
                                            aria-label="delete"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <span>&emsp;</span>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 62 * emptyRows }}>
                                <TableCell colSpan={7} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isModalAddBookOpen}
                onClose={closeModalAddBook}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isModalAddBookOpen}>
                    <div className={classes.paper}>
                        <Typography variant="h5" noWrap>
                            Add Book
                            <IconButton
                                style={{ float: 'right' }}
                                color="inherit"
                                onClick={closeModalAddBook}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Typography>
                        <AddBook reload={reload} />
                    </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isModalEditBookOpen}
                onClose={closeModalEditBook}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isModalEditBookOpen}>
                    <div className={classes.paper}>
                        <Typography variant="h5" noWrap>
                            Edit Book
                            <IconButton
                                style={{ float: 'right' }}
                                color="inherit"
                                onClick={closeModalEditBook}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Typography>
                        <EditBook reload={reload} bookId={bookId} />
                    </div>
                </Fade>
            </Modal>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete book"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to delete this book?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.buttonDialog} onClick={handleNotSure} color="primary">
                        No
                    </Button>
                    <Button className={classes.buttonDialog} onClick={handleSure} color="secondary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
