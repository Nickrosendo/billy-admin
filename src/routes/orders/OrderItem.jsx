import React from 'react';
import moment from 'moment';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

import OrderActions from './OrderActions';

const styles = theme => ({
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
});

function OrderItem({ classes, order, index, expanded, toggleExpand }) {
  const parsedOrderDate = moment(order.date).format('DD/MM/YYYY HH:mm');

  return (
    <ExpansionPanel
      key={order.id}
      expanded={expanded === index}
      onChange={() => toggleExpand(index)}
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
              <Card className={classes.card} style={{ marginRight: 10 }}>
                Observações:
              </Card>
              <Typography>{order.observation}</Typography>
            </div>
          ) : null}

          <OrderActions order={order} />
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default withStyles(styles)(OrderItem);
