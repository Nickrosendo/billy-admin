import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

// ui components
import Loading from '../../components/Loading';
import EmptyStateOrders from './EmptyStateOrders';
import OrderItem from './OrderItem';

//actions
import {
  fetchOrders
} from '../../store/actions/orders';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    backgroundColor: '#eee',
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

  toggleExpand = (index) => {
    if (this.state.expanded === index) {
      this.setState({ expanded: null });
    } else {
      this.setState({ expanded: index });
    }
  };

  render() {
    const { classes, orders } = this.props;
    const { history } = orders;

    if (this.state.loading) {
      return <Loading />;
    } else {
      return history.length ? (
        <div className={classes.root}>
          {history.map((order, index) => (
            <OrderItem order={order} index={index} expanded={this.state.expanded} toggleExpand={this.toggleExpand} />
          ))}
        </div>
      ) : (
        <EmptyStateOrders />
      );
    }
  }
}

const mapStateToProps = state => ({ orders: state.orders });

export default connect(
  mapStateToProps,
  {
    fetchOrders
  }
)(withStyles(styles, { withTheme: true })(OrdersContainer));
