import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    color: '#ffb46a',
    marginTop: '50%'
  },
});

function Loading(props) {
	const { classes } = props;
  return (
    <div style={{textAlign: 'center'}}>
      <CircularProgress classes={classes.root} className={classes.progress} size={80}/>
    </div>
  );
}

export default withStyles(styles)(Loading);
