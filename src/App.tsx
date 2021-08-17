import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import Main from './components/Main';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: 'url(https://www.teahub.io/photos/full/190-1905219_vintage-wallpaper-hd-books.jpg) no-repeat center center fixed',
      backgroundSize: 'cover'
    },
    header: {
      textAlign: 'center',
      borderRadius: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.06)'
    },
    main: {
      textAlign: 'center',
      minHeight: '92vh',
      maxWidth: '100%',
      borderRadius: 0,
      // backgroundImage: 'linear-gradient(to bottom right, #667eea, #764ba2)'
      backgroundColor: 'rgba(255, 255, 255, 0.06)'
    },
  }),
);

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Paper className={classes.header}>
            <Header />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.main}>
            <Main />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
