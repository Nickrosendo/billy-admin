import React, { Component } from 'react';

import InputWithIcon from '../../components/inputs/InputWithIcon';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FingerPrint from '@material-ui/icons/Fingerprint';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';

// actions
import { signUp } from '../../store/actions/auth';

// styles
import { styles } from './styles/SignUpStyles';

class SignUp extends Component {
  state = {
    email: '',
    c_email: '',
    password: '',
    c_password: '',
    ownerName: '',
    phone: '',
    address: '',
    companyName: '',
    logoUrl: '',
    cnpj: '',
    errorMsg: '',
  };

  validateInput = (inputName, value) => {
    switch (inputName) {
      case 'c_email':
        if (value !== this.state.email) {
          this.setState({
            errorMsg: 'Os e-mails não coincidem',
          });
        } else {
          this.setState({
            errorMsg: '',
          });
        }
        return false;
      case 'c_password':
        if (value !== this.state.password) {
          this.setState({
            errorMsg: 'As senhas não coincidem',
          });
        } else {
          this.setState({
            errorMsg: '',
          });
        }
        return false;
      default:
        return false;
    }
  };

  isValid = () => {
    return (
      !this.state.errorMsg &&
      this.state.email &&
      this.state['c_email'] &&
      this.state.password &&
      this.state['c_password'] &&
      this.state.ownerName &&
      this.state.phone &&
      this.state.address &&
      this.state.cnpj &&
      this.state.companyName &&
      this.state.logoUrl
    );
  };

  handleSignUp = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      console.log("entrou if");
      this.props.signUp({
        email: this.state.email,
        ownerName: this.state.ownerName,
        phone: this.state.phone,
        address: this.state.address,
        companyName: this.state.companyName,
        logoUrl: this.state.logoUrl,
        cnpj: this.state.cnpj,
      });
    } else {
      this.setState({
        errorMsg: 'Cadastro inválido, preencha os campos corretamente!'
      })
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    if (name && typeof value !== 'undefined') {
      this.validateInput(name, value);

      let state = {};
      state[name] = value;
      this.setState(state);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12} className={classes.leftGrid}>
            <InputWithIcon
              label={'Nome do restaurante'}
              name={'companyName'}
              Icon={AccountCircle}
              value={this.state.companyName}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item md={6} xs={12} className={classes.rightGrid}>
            <InputWithIcon
              label={'Nome do proprietário'}
              name={'ownerName'}
              Icon={AccountCircle}
              value={this.state.ownerName}
              onChange={this.handleChange}
            />
          </Grid>

          <Grid item md={6} xs={12} className={classes.leftGrid}>
            <InputWithIcon
              label={'Email'}
              name={'email'}
              Icon={AccountCircle}
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Grid>

          <Grid item md={6} xs={12} className={classes.rightGrid}>
            <InputWithIcon
              label={'Confirmar Email'}
              name={'c_email'}
              Icon={AccountCircle}
              value={this.state['c_email']}
              onChange={this.handleChange}
            />
          </Grid>

          <Grid item md={6} xs={12} className={classes.leftGrid}>
            <InputWithIcon
              label={'Endereço'}
              name={'address'}
              Icon={AccountCircle}
              value={this.state.address}
              onChange={this.handleChange}
            />
          </Grid>

          <Grid item md={6} xs={12} className={classes.rightGrid}>
            <InputWithIcon
              label={'Url do logo'}
              name={'logoUrl'}
              Icon={AccountCircle}
              value={this.state.logoUrl}
              onChange={this.handleChange}
            />
          </Grid>

          <Grid item md={6} xs={12} className={classes.leftGrid}>
            <InputWithIcon
              label={'cnpj'}
              name={'cnpj'}
              Icon={AccountCircle}
              value={this.state.cnpj}
              onChange={this.handleChange}
            />
          </Grid>

          <Grid item md={6} xs={12} className={classes.rightGrid}>
            <InputWithIcon
              label={'Telefone'}
              name={'phone'}
              Icon={AccountCircle}
              type={'tel'}
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </Grid>

          <Grid item md={6} xs={12} className={classes.leftGrid}>
            <InputWithIcon
              label={'Senha'}
              name={'password'}
              Icon={FingerPrint}
              type={'password'}
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Grid>

          <Grid item md={6} xs={12} className={classes.rightGrid}>
            <InputWithIcon
              label={'Confirmar Senha'}
              name={'c_password'}
              Icon={FingerPrint}
              type={'password'}
              value={this.state['c_password']}
              onChange={this.handleChange}
            />
          </Grid>
        </Grid>

        <p className={classes.errorMsg}>{this.state.errorMsg}</p>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleSignUp}
        >
          Cadastrar
        </Button>
      </div>
    );
  }
}

export default connect(
  null,
  {
    signUp,
  }
)(withStyles(styles)(SignUp));
