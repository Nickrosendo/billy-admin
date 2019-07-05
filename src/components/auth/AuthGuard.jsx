import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import logo from '../../assets/images/billy-pizza.png';

import Login from './Login';
import SignUp from './SignUp';

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
    width: '100%',
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
    width: '100%'
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

class AuthGuard extends Component {
  state = {
    isLogin: true,
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
                Billy Admin<br />
                {this.state.isLogin ? 'Login' : 'Cadastro'}
              </Typography>
              {this.state.isLogin ? <Login /> : <SignUp />}
            </CardContent>
            <CardActions>
              {this.state.isLogin ? (
                <Button
                  className={classes.secondaryButton}
                  size="small"
                  onClick={() => this.setState({ isLogin: false })}
                >
                  Cadastre-se já
                </Button>
              ) : (
                <Button
                  className={classes.secondaryButton}
                  size="small"
                  onClick={() => this.setState({ isLogin: true })}
                >
                  Fazer Login
                </Button>
              )}
            </CardActions>
          </MuiThemeProvider>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(AuthGuard);
