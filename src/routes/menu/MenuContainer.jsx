import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';

import MenuItem from './MenuItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class MenuContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12} className={classes.grid}>
            {/* <Paper className={classes.paper}>xs=12</Paper> */}
            <MenuItem />
          </Grid>
          <Grid item md={6} xs={12} className={classes.grid}>
            {/* <Paper className={classes.paper}>xs=12</Paper> */}
            <MenuItem />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MenuContainer);
