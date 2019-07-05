import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    margin: theme.spacing(1),
    maxWidth: '100%',
    minWidth: '50%',
  },
});

function InputWithIcon(props) {
  const { classes, label, Icon, type, name, value, onChange } = props;

  return (
      <FormControl className={classes.root}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Input
          type={type ? type : 'text'}
          name={name}
          startAdornment={
            props.Icon ? (
              <InputAdornment position="start">
                <Icon />
              </InputAdornment>
            ) : null
          }
          value={value}
          onChange={onChange}
        />
      </FormControl>
  );
}

InputWithIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  Icon: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default withStyles(styles)(InputWithIcon);
