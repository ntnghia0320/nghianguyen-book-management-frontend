import React from 'react';
import bookService from '../../services/book.service';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useLocation } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardBook from '../common/CardBook';

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
            padding: theme.spacing(2),
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(8)
        },
        pagination: {
            borderRadius: 4,
            position: 'fixed',
            right: theme.spacing(2),
            bottom: theme.spacing(2),
            backdropFilter: 'blur(5px)',
        },
    }),
);

export default function Home() {
    const classes = useStyles();
    const postDefault: Book[] = [];
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);
    const param = useLocation().search.substr(1);
    const [books, setBooks] = React.useState(postDefault);

    React.useEffect(() => {
        bookService.getAllBookEnabled(page - 1, param).then(
            (res) => {
                setBooks(res.items);
                setTotalPage(Math.ceil(res.totalResults / 8));
            },
            (error) => {
                alert(error.message)
            }
        );
        console.log('Home');
        // eslint-disable-next-line
    }, [page, totalPage]);

    React.useEffect(() => {
        bookService.getAllBookEnabled(page - 1, param).then(
            (res) => {
                setBooks(res.items);
                setTotalPage(Math.ceil(res.totalItems / 8));
            },
            (error) => {
                alert(error.message)
            }
        );
        setPage(1);
        console.log('Home');
        // eslint-disable-next-line
    }, [param]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <>
            <div className={classes.root}>
                <Grid container className={classes.container}>
                    {
                        books.map(book => (
                            <Grid key={book.title + book.author} item xs={12} sm={6} md={3}>
                                <Paper className={classes.paper}>
                                    <CardBook book={book} />
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
            <div className={classes.pagination}>
                <Pagination
                    count={totalPage}
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}
