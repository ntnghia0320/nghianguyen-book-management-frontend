import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardBook from './CardBook';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(0),
            height: 500,
            maxWidth: '100%',
            display: 'inline',
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        container: {
            alignItems: 'center',
            padding: theme.spacing(2)
        }
    }),
);

interface Prop {
    books: Book[]
}

export default function BooksList(prop: Prop) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                {
                    prop.books.map(book => (
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper className={classes.paper}>
                                <CardBook book={book} />
                            </Paper>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    );
}
