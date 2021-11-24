import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Divider, IconButton } from "@material-ui/core";
import bookService from "../../services/book.service";
import commentService from "../../services/comment.service";
import AddComment from "../common/AddComment";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import getCurrentUser from "../../services/user-info";
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import EditComment from "../common/EditComment";
import Close from "@material-ui/icons/Close";
import Edit from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%',
            display: 'block',
            backgroundColor: '#fcecea',
        },
        paper: {
            flexGrow: 1,
            width: '80%',
            margin: 'auto',
            padding: theme.spacing(3),
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            textAlign: 'center',
        },
        image: {
            maxWidth: '100%'
        },
        username: {
            display: 'flex',
            paddingRight: 20,
            justifyContent: 'flex-end'
        }
        ,
        addComment: {
            margin: theme.spacing(1),
            display: 'flex',
            justifyContent: 'left',
            width: "100%",
        },
        listComment: {
            display: 'block',
            textAlign: 'left',
            marginLeft: 4,
            borderRadius: 4,
            padding: 3,
            marginTop: 4,
        },
        buttonDialog: {
            '&:focus': {
                backgroundColor: '#e0dede96',
            },
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '100%',
        },
        paperModal: {
            [theme.breakpoints.down('sm')]: {
                width: '70%',
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
    }),
);

export default function BookDetail() {
    const classes = useStyles();
    let { bookId } = useParams<{ bookId: string }>();
    const [book, setBook] = React.useState<Book>({} as Book);
    const [comments, setComments] = React.useState<Comment[]>([]);
    const [change, setChange] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [commentId, setCommentId] = React.useState(0);
    const [isModalEditCommentOpen, setIsModalEditCommentOpen] = React.useState(false);

    React.useEffect(() => {
        bookService.getBookById(Number(bookId)).then(
            (res) => {
                setBook(res);
            },
            (error) => {
                alert(error.response.data.message);
            }
        );

        commentService.getCommentByBookId(Number(bookId)).then(
            (res) => {
                setComments(res);
            },
            (error) => {
                alert(error.response.data.message);
            }
        );
        console.log('book detail');
    }, [bookId, change]);

    const addComment = (comment: Comment) => {
        commentService.addComment(comment, Number(bookId)).then(
            (res) => {
                reload();
            },
            (error) => {
                alert(error.response.data.message);
            }
        )
    }

    const reload = () => {
        setChange(!change);
        closeModalEditComment();
    }

    const deleteComment = (commentId: any) => {
        setCommentId(commentId);
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleSure = () => {
        commentService.deleteComment(commentId).then(
            (res) => {
                reload();
            },
            (error) => {
                alert(error.response.data.message)
            }
        );
        setOpenDialog(false);
    }

    const handleNotSure = () => {
        setOpenDialog(false);
    }

    const openModalEditComment = () => {
        setIsModalEditCommentOpen(true);
    };

    const closeModalEditComment = () => {
        setIsModalEditCommentOpen(false);
    };

    const editComment = (commentId: any) => {
        setCommentId(commentId);
        openModalEditComment();
    }

    return (
        <div className={classes.root}>
            <Grid item xs={12} md={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" gutterBottom>{`${book.title} - ${book.author}`}</Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        {new Date(book.createdAt).toLocaleString()}
                    </Typography>

                    <img className={classes.image} src={book.image} alt="" />

                    <Typography align='justify' variant="subtitle1" gutterBottom>{book.description}</Typography>

                    <div className={classes.username}>
                        <Typography variant="h6" gutterBottom>
                            {`${book.user?.firstName} ${book.user?.lastName}`}
                        </Typography>
                    </div>
                    <Divider />
                    <br />
                    <Typography style={{ float: 'left' }} variant="h4" gutterBottom>Comment</Typography>
                    {getCurrentUser() && (
                        <div className={classes.addComment}>
                            <AddComment addComment={addComment}></AddComment>
                        </div>
                    )}
                    <div>
                        {comments && comments.map(comment => (
                            <div className={classes.listComment} key={comment.id}>
                                <Typography variant="h6" gutterBottom>{comment.user?.email}</Typography>
                                <Typography variant="caption" gutterBottom>{comment.createdAt}</Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {comment.message}
                                    {((getCurrentUser() && comment.user?.id === getCurrentUser().userId)
                                        || (getCurrentUser() && getCurrentUser().role === "ROLE_ADMIN")) && (
                                            <>
                                                <IconButton
                                                    color="primary"
                                                    aria-controls="simple-menu"
                                                    aria-haspopup="true"
                                                    onClick={() => editComment(comment.id)}
                                                >
                                                    <Edit />
                                                </IconButton>

                                                <IconButton
                                                    color="secondary"
                                                    aria-controls="simple-menu"
                                                    aria-haspopup="true"
                                                    onClick={() => deleteComment(comment.id)}
                                                >
                                                    <Close />
                                                </IconButton>
                                            </>
                                        )
                                    }
                                </Typography>
                                <Divider />
                            </div>
                        ))}
                    </div>
                </Paper>
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isModalEditCommentOpen}
                onClose={closeModalEditComment}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isModalEditCommentOpen}>
                    <div className={classes.paperModal}>
                        <Typography variant="h5" noWrap>
                            Edit Comment
                            <IconButton
                                style={{ float: 'right' }}
                                color="inherit"
                                onClick={closeModalEditComment}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Typography>
                        <EditComment reload={reload} commentId={commentId} />
                    </div>
                </Fade>
            </Modal>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete comment</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to delete this comment?
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
        </div>
    );
}
