import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FingerPrint from '@material-ui/icons/Fingerprint';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import InputWithIcon from '../../components/inputs/InputWithIcon';

import logo from '../../assets/images/billy-pizza.png';

import { connect } from 'react-redux';

// actions 
import { signIn } from '../../store/actions/auth';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: 'rgb(255, 180, 106)',
    },
  },
});

const styles = {
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: '50%',
    maxWidth: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  content: {
    textAlign: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  button: {
    color: 'white',
    marginTop: 15,
  },
  pos: {
    marginBottom: 12,
  },
  drawerLogoImg: {
    width: 50,
    height: 50,
  },
  secondaryButton: {
    textAlign: 'center',
  },
};

class LoginContainer extends Component {
  state = {
    email: '',
    password: '',
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
      <div className={classes.root}>
        <Card className={classes.card} raised={true}>
          <MuiThemeProvider theme={theme}>
            <CardContent className={classes.content}>
              <img
                src={logo}
                className={classes.drawerLogoImg}
                alt="logo-small"
              />
              <Typography variant="h3" component="h1">
                Billy Admin
              </Typography>

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
            </CardContent>
            <CardActions>
              <Button className={classes.secondaryButton} size="small">
                Solicitar cadastro
              </Button>
            </CardActions>
          </MuiThemeProvider>
        </Card>
      </div>
    );
  }
}

export default connect(null, {
	signIn,
})(withStyles(styles)(LoginContainer));
