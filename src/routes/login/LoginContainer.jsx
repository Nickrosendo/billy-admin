import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FingerPrint from '@material-ui/icons/Fingerprint';

import InputWithIcon from '../../components/inputs/InputWithIcon';

import logo from "../../assets/images/billy-pizza.png";

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
	},
	content: {
		textAlign: "center"
	},
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
	},
	drawerLogoImg: {
    width: 50,
    height: 50
  }
};

class LoginContainer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card} raised={true}>
          <CardContent className={classes.content}>
						<img src={logo} className={classes.drawerLogoImg} alt="logo-small" />
            <Typography variant="h3" component="h1">
              Billy
            </Typography>
            <InputWithIcon label={"Email"} Icon={AccountCircle}/>
						<InputWithIcon label={"Password"} Icon={FingerPrint} type={'password'} />
            <Typography component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(LoginContainer);
