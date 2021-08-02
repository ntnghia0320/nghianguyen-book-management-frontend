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
    },
    header: {
      textAlign: 'center',
      borderRadius: 0
    },
    main: {
      textAlign: 'center',
      height: '92vh',
      borderRadius: 0
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
