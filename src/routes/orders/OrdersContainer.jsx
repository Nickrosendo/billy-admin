import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

//actions
import { fetchOrders } from "../../store/actions/orders";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(255, 180, 106)"
    }
  }
});

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper
  },
  card: {
    padding: 10,
    background: "rgb(255, 180, 106)",
    color: "#fff"
  },
  orderListItem: {
    display: "flex",
    justfyContent: "space-between",
    alignItems: "center"
  },
  button: {
    color: "#fff"
  }
});

class OrdersContainer extends Component {
  componentWillMount() {
    this.props
      .fetchOrders()
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  render() {
    const { classes, orders } = this.props;
    const { history } = orders;
    console.log("history.length: ", history.length);
    return (
      <div className={classes.root}>
        {history.map(order => {
          return (
            <ListItem
              button
              key={order.id}
              style={{
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
                padding: 20
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
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
              <p> { order.items.map( item => (<span> ({ item.quantity}) - { item.name } </span>))} </p>
              <Card className={classes.card} style={{ marginLeft: 10 }}>
                R${order.totalPrice}
              </Card>
            </ListItem>
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
    fetchOrders
  }
)(withStyles(styles, { withTheme: true })(OrdersContainer));
