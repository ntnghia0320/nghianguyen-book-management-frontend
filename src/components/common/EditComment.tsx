import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import commentService from '../../services/comment.service';
import CustomizedSnackbars from './CustomizedSnackbars';

interface Props {
    commentId: number,
    reload: Reload
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                width: '100%',
                margin: 'auto',
            },
            width: '88%',
        },
        formControlTextField: {
            width: '100%',
        },
        formControlBtnSubmit: {
            float: 'right',
            width: 200,
            textTransform: 'none',
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(2),
        }
    }),
);

export default function EditComment({ reload, commentId }: Props) {
    const classes = useStyles();
    const [comment, setComment] = React.useState<Comment>({} as Comment);
    const [activeSnackBar, setActiveSnackBar] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState('');
    const [snackBarStatus, setSnackBarStatus] = React.useState('');

    React.useEffect(() => {
        commentService.getCommentById(commentId).then(
            (res) => {
                setComment(res);
            },
            () => {

            }
        )
    }, []);

    const submit = (event: any) => {
        event.preventDefault();

        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date + ' ' + time;

        comment.updatedAt = dateTime;

        // commentService.updateBook(book, bookId, book.user?.id).then(
        //     () => {
        //         setActiveSnackBar(!activeSnackBar);
        //         setSnackBarMessage('Edit book Success');
        //         setSnackBarStatus('success');
        //         window.setTimeout(function () {
        //             reload();
        //         }, 1000);
        //     },
        //     (error) => {
        //         setActiveSnackBar(!activeSnackBar);
        //         setSnackBarMessage(error.response.data.message);
        //         setSnackBarStatus('error');
        //     }
        // );
    }

    const onChangeTagName = (event: any) => {
        setComment({ ...comment, message: event.target.value });
    }
    return (
        <form className={classes.root}>
            <FormControl className={classes.formControlTextField}>
                <TextField
                    focused
                    id="multiline"
                    label="Edit comment"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={comment.message}
                    placeholder="Edit comment"
                    onChange={(event) => onChangeTagName(event)}
                />

            </FormControl>
            <FormControl className={classes.formControlBtnSubmit}>
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    onClick={(event) => submit(event)}
                >
                    Update
                </Button>
            </FormControl>
            <CustomizedSnackbars active={activeSnackBar} status={snackBarStatus} autoHideDuration={4000} message={snackBarMessage} />
        </form>
    );
};