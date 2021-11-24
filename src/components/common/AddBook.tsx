import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import CustomizedSnackbars from "./CustomizedSnackbars";
import Button from "@material-ui/core/Button";
import bookService from "../../services/book.service";

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

interface Prop {
    reload: Reload;
}

export default function AddBook({ reload }: Prop) {
    const classes = useStyles();
    const bookDefault: Book = {} as Book;
    const [activeSnackBar, setActiveSnackBar] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState('');
    const [snackBarStatus, setSnackBarStatus] = React.useState('');
    const [helperTextTitle, setHelperTextTitle] = React.useState<String>("");
    const [helperTextAuthor, setHelperTextAuthor] = React.useState<String>("");
    const [isTitleError, setIsTitleError] = React.useState<boolean>(false);
    const [isAuthorError, setIsAuthorError] = React.useState<boolean>(false);
    const [book, setBook] = React.useState(bookDefault);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (book.title === undefined || book.title === "") {
            setIsTitleError(true);
            setHelperTextTitle("Title must not be empty")
        } else if (book.author === undefined || book.author === "") {
            setIsTitleError(false);
            setHelperTextTitle("")
            setIsAuthorError(true);
            setHelperTextAuthor("Author must not be empty")
        } else {
            setIsTitleError(false);
            setIsAuthorError(false);
            setHelperTextTitle("")
            setHelperTextAuthor("")
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date + ' ' + time;

            book.createdAt = dateTime;
            book.updatedAt = dateTime;

            bookService.addBook(book).then(
                (res) => {
                    setActiveSnackBar(!activeSnackBar);
                    setSnackBarMessage('Add new book Success');
                    setSnackBarStatus('success');
                    window.setTimeout(function () {
                        reload();
                    }, 1000);
                },
                (error) => {
                    setActiveSnackBar(!activeSnackBar);
                    setSnackBarMessage(error.response.data.message);
                    setSnackBarStatus('error');
                }
            );
        }
    };

    return (
        <form className={classes.root} onSubmit={onSubmit} noValidate>
            <div>
                <FormControl className={classes.formControl}>
                    <TextField
                        required
                        id="standard-basic"
                        error={isTitleError}
                        helperText={helperTextTitle}
                        autoComplete='off'
                        label="Title"
                        name="title"
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        required
                        error={isAuthorError}
                        helperText={helperTextAuthor}
                        autoComplete='off'
                        id="standard-basic"
                        label="Author"
                        name="author"
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        autoComplete='off'
                        id="outlined-multiline-static"
                        name="description"
                        label="Description"
                        multiline
                        rows={10}
                        variant="outlined"
                        onChange={onChange}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        autoComplete='off'
                        id="standard-basic"
                        label="Link image"
                        name="image"
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
                    Add
                </Button>
            </div>
            <CustomizedSnackbars active={activeSnackBar} status={snackBarStatus} autoHideDuration={4000} message={snackBarMessage} />
        </form>
    );
};