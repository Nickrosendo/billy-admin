import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

function InputWithIcon(props) {
  const { classes, label, Icon, type, value, onChange } = props;

  return (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">{label}</InputLabel>
        <Input
          id="input-with-icon-adornment"
          type={type ? type : 'text'}
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
    </div>
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
