import React from 'react';
import { Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';

//actions
import {
  restaurantOrderConfirm,
  restaurantOrderPreprare,
  restaurantOrderReady,
  restaurantOrderPaymentReceived,
} from '../../store/actions/orders';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(255, 180, 106)',
      contrastText: '#fff',
    },
    text: {
      main: '#fff',
    },
  },
});

function OrderActions({
  order,
  restaurantOrderConfirm,
  restaurantOrderPaymentReceived,
  restaurantOrderReady,
  restaurantOrderPreprare,
}) {
  let orderAction = null;
  switch (order.status) {
    case 'finalizada':
      orderAction = (
        <Button disabled={true} variant="contained" color="primary">
          Pedido finalizado
        </Button>
      );
      break;
    case 'à confirmar':
      orderAction = (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            restaurantOrderConfirm(order);
          }}
        >
          Confirmar Pedido
        </Button>
      );
      break;
    case 'ready':
      orderAction = (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            restaurantOrderPaymentReceived(order);
          }}
        >
          Confirmar Pagamento
        </Button>
      );
      break;
    case 'preparing':
      orderAction = (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            restaurantOrderReady(order);
          }}
        >
          Pedido pronto
        </Button>
      );
      break;
    case 'confirmada':
      orderAction = (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            restaurantOrderPreprare(order);
          }}
        >
          Preparar pedido
        </Button>
      );
      break;
    default:
      return null;
  }
  return <MuiThemeProvider theme={theme}>{orderAction}</MuiThemeProvider>;
}

const mapDispatchToProps = {
  restaurantOrderConfirm,
  restaurantOrderPreprare,
  restaurantOrderReady,
  restaurantOrderPaymentReceived,
};

export default connect(
  null,
  mapDispatchToProps
)(OrderActions);
