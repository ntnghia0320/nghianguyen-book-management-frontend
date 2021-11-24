import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import React from 'react';

interface Props {
    addComment: AddComment;
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                width: '100%',
                margin: 'auto',
            },
            width: '95%',
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
            color: '#be9c91'
        }
    }),
);

export default function AddComment({ addComment }: Props) {
    const classes = useStyles();
    const [comment, setComment] = React.useState<Comment>({} as Comment);
    const [helperText, setHelperText] = React.useState<String>("");
    const [isError, setIsError] = React.useState<boolean>(false);

    const submit = (event: any) => {
        event.preventDefault();

        if (comment.message === undefined || comment.message === "") {
            setIsError(true);
            setHelperText("Comment must not be empty")
        } else {
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date + ' ' + time;

            comment.createdAt = dateTime;
            comment.updatedAt = dateTime;

            addComment(comment);

            setComment({ ...comment, message: '', createdAt: '', updatedAt: '' });
        }
    }

    const onChangeTagName = (event: any) => {
        if (comment.message !== "") {
            setIsError(false);
            setHelperText("");
        }
        setComment({ ...comment, message: event.target.value });
    }
    return (
        <form className={classes.root} noValidate>
            <FormControl className={classes.formControlTextField}>
                <TextField
                    id="multiline"
                    autoComplete='off'
                    error={isError}
                    helperText={helperText}
                    required
                    label="Add comment"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={comment.message}
                    placeholder="Add comment"
                    onChange={(event) => onChangeTagName(event)}
                />

            </FormControl>
            <FormControl className={classes.formControlBtnSubmit}>
                <Button
                    type="submit"
                    variant="outlined"
                    onClick={(event) => submit(event)}
                >
                    Add Comment
                </Button>
            </FormControl>
        </form>
    );
};