import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

//actions
import { fetchOrders } from '../../store/actions/orders';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(255, 180, 106)',
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
    console.log('history.length: ', history.length);
    return this.state.loading ? (
      <Loading />
    ) : (
      <div className={classes.root}>
        {history.map((order, index) => {
          return (
            <ExpansionPanel
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
                    <MuiThemeProvider theme={theme}>
                      <Button
                        variant="contained"
                        className={classes.button}
                        color="primary"
                      >
                        Confirmar
                      </Button>
                      <Button variant="contained" style={{ marginLeft: 10 }}>
                        Detalhes
                      </Button>
                    </MuiThemeProvider>
                  </div>
                  <p>
                    {' '}
                    {order.items.map(item => (
                      <span>
                        {' '}
                        ({item.quantity}) - {item.name}{' '}
                      </span>
                    ))}{' '}
                  </p>
                  <Card className={classes.card} style={{ marginLeft: 10 }}>
                    R${order.totalPrice}
                  </Card>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
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
  }
)(withStyles(styles, { withTheme: true })(OrdersContainer));
