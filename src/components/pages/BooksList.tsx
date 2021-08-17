import React from 'react';
import { alpha, createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import bookService from '../../services/book.service';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { NavLink, useLocation } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import EditBook from '../common/EditBook';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

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

type Order = 'asc' | 'desc';

interface HeadCell {
    disablePadding: boolean;
    id: keyof Book;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
    { id: 'author', numeric: true, disablePadding: false, label: 'Author' },
    { id: 'createdAt', numeric: true, disablePadding: false, label: 'CreatedAt' },
    { id: 'enabled', numeric: true, disablePadding: false, label: 'Status' },
];

interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Book) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof Book) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <StyledTableRow>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            classes={{ root: classes.inActive, active: classes.active, icon: classes.icon }}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
                <StyledTableCell align={'right'}>View</StyledTableCell>
                <StyledTableCell align={'right'}>Edit</StyledTableCell>
                <StyledTableCell align={'right'}>Delete</StyledTableCell>
            </StyledTableRow>
        </TableHead>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paperModal: {
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
                backgroundColor: '#b2b8e1',
            },
        },
        inActive: {
            color: 'white',
            "&:hover": {
                color: '#8bf6ff',
            },
            '&$active': {
                color: '#8bf6ff',
            },
        },
        active: {
            color: "#8bf6ff",
        },
        icon: {
            color: '#8bf6ff !important'
        },
        search: {
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            width: '50%',
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }),
);

export default function BooksList() {
    const classes = useStyles();
    const [isModalEditBookOpen, setIsModalEditBookOpen] = React.useState(false);
    const [bookId, setBookId] = React.useState(-1);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Book>('createdAt');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalRows, setTotalRows] = React.useState(0);
    const [books, setBooks] = React.useState<Book[]>([]);
    const param = useLocation().search.substr(1);
    const [change, setChange] = React.useState(false);

    React.useEffect(() => {
        bookService.getAllBook(orderBy, order, page, rowsPerPage, param).then(
            (res) => {
                setBooks(res.items);
                setTotalRows(res.totalResults);
            },
            (error) => {
                alert(error.response.data.message);
            }
        );
        console.log('book list');
    }, [order, orderBy, page, rowsPerPage, param, change]);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Book) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
        closeModalEditBook();
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, totalRows - page * rowsPerPage);

    const enabledBook = (book: Book, bookId: number) => {
        book.enabled = !book.enabled;
        bookService.updateBook(book, bookId, book.user?.id).then(
            (res) => {
                reload();
                console.log('enabledBook');
            },
            (error) => {
                alert(error.response.data.message)
            }
        );
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        aria-label="sticky table"
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="small"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {books.length === 0 && (
                                <StyledTableRow>
                                    <StyledTableCell align="center" colSpan={7}>Empty</StyledTableCell>
                                </StyledTableRow>
                            )}
                            {books.map((book, index) => {
                                return (
                                    <StyledTableRow key={`${book.title}${book.author}`}>
                                        <TableCell align="left">{book.title}</TableCell>
                                        <TableCell align="right">{book.author}</TableCell>
                                        <TableCell align="right">{book.createdAt}</TableCell>
                                        <StyledTableCell align="right">
                                            <Tooltip title={book.enabled ? 'Disable Book' : 'Enable Book'}>
                                                <Button
                                                    style={{ textTransform: 'none' }}
                                                    onClick={() => enabledBook(book, Number(book.id))}
                                                >
                                                    <Typography
                                                        color={book.enabled ? "primary" : "secondary"}
                                                        variant="subtitle1"
                                                        component="h2"
                                                    >
                                                        {book.enabled ? 'Enabled' : 'Disabled'}
                                                    </Typography>
                                                </Button>
                                            </Tooltip>
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
                                );
                            })}
                            {emptyRows > 0 && (
                                <StyledTableRow style={{ height: 62 * emptyRows }}>
                                    <TableCell colSpan={7} />
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
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
                    <div className={classes.paperModal}>
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
                    <Button className={classes.buttonDialog} onClick={handleSure} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
