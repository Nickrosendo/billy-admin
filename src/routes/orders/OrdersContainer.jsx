import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// ui components
import Loading from '../../components/Loading';

//actions
import {
  fetchOrders,
  restaurantOrderConfirm,
  restaurantOrderPreprare,
  restaurantOrderReady,
  restaurantOrderPaymentReceived,
} from '../../store/actions/orders';

import moment from 'moment';

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

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    backgroundColor: '#eee',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  card: {
    padding: 10,
    background: 'rgb(255, 180, 106)',
    color: '#fff',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    color: '#fff',
  },
});

class OrdersContainer extends Component {
  state = {
    expanded: null,
    loading: true,
  };

  componentWillMount() {
    this.props
      .fetchOrders()
      .then(res => {
        this.setState({ loading: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  orderActions = order => {
    switch (order.status) {
      case 'finalizada':
        return (
          <Button disabled={true} variant="contained" color="primary">
            Pedido finalizado
          </Button>
        );
      case 'à confirmar':
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.props.restaurantOrderConfirm(order);
            }}
          >
            Confirmar Pedido
          </Button>
        );
      case 'ready':
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.props.restaurantOrderPaymentReceived(order);
            }}
          >
            Confirmar Pagamento
          </Button>
        );
      case 'preparing':
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.props.restaurantOrderReady(order);
            }}
          >
            Pedido pronto
          </Button>
        );
      case 'confirmada':
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.props.restaurantOrderPreprare(order);
            }}
          >
            Preparar pedido
          </Button>
        );
      default:
        return null;
    }
  };

  render() {
    const { classes, orders } = this.props;
    const { history } = orders;

    return this.state.loading ? (
      <Loading />
    ) : (
      <div className={classes.root}>
        {history.map((order, index) => {
          const parsedOrderDate = moment(order.date).format('DD/MM/YYYY HH:mm');
          return (
            <ExpansionPanel
              key={order.id}
              expanded={this.state.expanded === index}
              onChange={() => {
                if (this.state.expanded === index) {
                  this.setState({ expanded: null });
                } else {
                  this.setState({ expanded: index });
                }
              }}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.content}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Card className={classes.card} style={{ marginRight: 10 }}>
                      R${order.totalPrice}
                    </Card>
                    <p>
                      {' '}
                      {order.items.map(item => (
                        <span key={item._id}>
                          {' '}
                          ({item.quantity}x) - {item.name}{' '}
                        </span>
                      ))}{' '}
                    </p>
                  </div>
                  <Card className={classes.card} style={{ marginRight: 10 }}>
                    {parsedOrderDate}
                  </Card>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}
                  >
                    <Card className={classes.card} style={{ marginRight: 10 }}>
                      Status do pedido:
                    </Card>
                    <Typography>{order.status}</Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}
                  >
                    <Card className={classes.card} style={{ marginRight: 10 }}>
                      Nome do cliente:
                    </Card>
                    <Typography>{order.userName}</Typography>
                  </div>
                  {order.observation ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}
                    >
                      <Card
                        className={classes.card}
                        style={{ marginRight: 10 }}
                      >
                        Observações:
                      </Card>
                      <Typography>{order.observation}</Typography>
                    </div>
                  ) : null}
                  <MuiThemeProvider theme={theme}>
                    {this.orderActions(order)}
                    {/* <SplitButton options={orderOptions} order={order} /> */}
                  </MuiThemeProvider>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({ orders: state.orders });

export default connect(
  mapStateToProps,
  {
    fetchOrders,
    restaurantOrderConfirm,
    restaurantOrderPreprare,
    restaurantOrderReady,
    restaurantOrderPaymentReceived,
  }
)(withStyles(styles, { withTheme: true })(OrdersContainer));
