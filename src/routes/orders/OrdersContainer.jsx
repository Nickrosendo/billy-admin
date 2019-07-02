import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// ui components
import Loading from '../../components/Loading';
import SplitButton from '../../components/inputs/SplitButton';

//actions
import {
  fetchOrders,
  restaurantOrderConfirm,
  restaurantOrderPreprare,
  restaurantOrderReady,
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

  render() {
    const { classes, orders } = this.props;
    const { history } = orders;

    const orderOptions = [
      {
        label: 'Pedido confirmado',
        handler: this.props.restaurantOrderConfirm,
      },
      {
        label: 'Pedido preparado',
        handler: this.props.restaurantOrderPreprare,
      },
      {
        label: 'Pedido pronto',
        handler: this.props.restaurantOrderReady,
      },
    ];

    return this.state.loading ? (
      <Loading />
    ) : (
      <div className={classes.root}>
        {history.map((order, index) => {
          const parsedOrderDate = moment(order.date).format('DD/MM/YYYY hh:mm');
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
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>Status do Pedido: </Typography>
                    <MuiThemeProvider theme={theme}>
                      <SplitButton options={orderOptions} order={order} />
                    </MuiThemeProvider>
                  </div>
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
  }
)(withStyles(styles, { withTheme: true })(OrdersContainer));
