import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Loading from '../../components/Loading';

import MenuItem from './MenuItem';
import EmptyStateMenu from './EmptyStateMenu';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    width: '100%',
    height: '100%',
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

    if (this.props.profile.menu) {
      console.log(
        'this.props.profile.menu: ',
        this.props.profile.menu.length > 0
      );
    }

    if (this.props.profile && this.props.profile.menu) {
      return (
        <div className={classes.root}>
          {this.props.profile.menu.length ? (
            <Grid container spacing={3}>
              <Grid item md={6} xs={12} className={classes.grid}>
                <MenuItem />
              </Grid>
            </Grid>
          ) : (
            <EmptyStateMenu />
          )}
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = state => ({ profile: state.auth.profile });

export default connect(mapStateToProps)(withStyles(styles)(MenuContainer));
