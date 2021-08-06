import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import CustomizedSnackbars from "./CustomizedSnackbars";
import Button from "@material-ui/core/Button";
import bookService from "../../services/book.service";

interface Prop {
    bookId: number
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                width: '90%',
                margin: 'auto',
            },
        },
        formControl: {
            margin: theme.spacing(1),
            width: "100%",
        },
        buttonSubmit: {
            textTransform: 'none',
            float: 'right'
        }
    }),
);

export default function EditBook(prop: Prop) {
    const classes = useStyles();
    const bookDefault: Book = {} as Book;
    const [activeSnackBar, setActiveSnackBar] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState('');
    const [snackBarStatus, setSnackBarStatus] = React.useState('');
    const [book, setBook] = React.useState(bookDefault);

    React.useEffect(() => {
        bookService.getBookById(prop.bookId).then(
            (res) => {
                setBook(res);
            },
            (error) => {
                alert(error.message)
            }
        );
        console.log('edit book');
    }, [prop.bookId])

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;
        book.updatedAt = dateTime;

        bookService.updateBook(book, prop.bookId).then(
            () => {
                setActiveSnackBar(!activeSnackBar);
                setSnackBarMessage('Edit book Success');
                setSnackBarStatus('success');
                window.setTimeout(function () {
                    window.location.reload();
                }, 1000);
            },
            (error) => {
                setActiveSnackBar(!activeSnackBar);
                setSnackBarMessage(error.response.data.message);
                setSnackBarStatus('error');
            }
        );
    };

    return (
        <form className={classes.root} onSubmit={onSubmit}>
            <div>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="standard-basic"
                        label="Title"
                        name="title"
                        value={book.title}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="standard-basic"
                        label="Author"
                        name="author"
                        value={book.author}
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="outlined-multiline-static"
                        name="description"
                        label="Description"
                        value={book.description}
                        multiline
                        rows={10}
                        variant="outlined"
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="standard-basic"
                        label="Link image"
                        name="image"
                        value={book.image}
                        onChange={onChange}
                    />
                </FormControl>
                <br />
                <br />
                <Button
                    className={classes.buttonSubmit}
                    variant="outlined"
                    color="primary"
                    type='submit'
                >
                    Edit Book
                </Button>
            </div>
            <CustomizedSnackbars active={activeSnackBar} status={snackBarStatus} autoHideDuration={4000} message={snackBarMessage} />
        </form>
    );
};