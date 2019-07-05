import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FingerPrint from '@material-ui/icons/Fingerprint';

import InputWithIcon from '../../components/inputs/InputWithIcon';

import { connect } from 'react-redux';

// actions
import { signIn } from '../../store/actions/auth';

const styles = {  
  content: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },    
  button: {
    color: 'white',
    marginTop: 15,
  }
};

class LoginContainer extends Component {
  state = {
    email: '',
    password: ''
  };

  handleSignin = event => {
    event.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log('credentials: ', credentials);
    this.props.signIn(credentials);
  };

  handleEmail = event => {
    const email = event.target.value;
    if (email) {
      this.setState({ email });
    } else {
      this.setState({ email: '' });
    }
  };

  handlePassword = event => {
    const password = event.target.value;
    if (password) {
      this.setState({ password });
    } else {
      this.setState({ password: '' });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <InputWithIcon
          label={'Email'}
          Icon={AccountCircle}
          value={this.state.email}
          onChange={this.handleEmail}
        />

        <InputWithIcon
          label={'Senha'}
          Icon={FingerPrint}
          type={'password'}
          value={this.state.password}
          onChange={this.handlePassword}
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleSignin}
        >
          Entrar
        </Button>
      </div>
    );
  }
}

export default connect(
  null,
  {
    signIn,
  }
)(withStyles(styles)(LoginContainer));
