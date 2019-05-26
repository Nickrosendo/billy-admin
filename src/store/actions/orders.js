export const fetchOrders = () => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
  ) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    firebase.auth().onAuthStateChanged(async user => {
      if (user && user.uid) {
        const { uid } = user;
        await firestore
          .collection("orders")
          .where("userID", "==", uid)
          .get()
          .then(snapshot => {
            const history = [];
            snapshot.forEach(doc => {
              const date = doc.data().date.toDate();
              const order = {
                id: doc.id,
                ...doc.data(),
                date
              };
              history.push(order);
            });
            dispatch({
              type: "SET_HISTORY",
              history
            });
            return true;
          })
          .catch(err => {
            console.error("Error fetching Orders", err);
            return false;
          });
      }
    });
  };
  
  export const confirmOrder = order => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
  ) => {
    const firestore = getFirestore();
  
    return await firestore
      .collection("orders")
      .add(order)
      .then(({ id }) => {
        const createdOrder = {
          id,
          ...order
        };
        dispatch({
          type: "CONFIRM_ORDER",
          order: createdOrder
        });
        return true;
      })
      .catch(err => {
        console.error("Error adding document: ", err);
        return false;
      });
  };
  
  export const startOrder = order => dispatch => {
    dispatch({
      type: "START_ORDER",
      order
    });
    dispatch({
      type: "TOGGLE_ORDER_LABEL_BANNER"
    });
  };
  
  export const closeOrder = orderId => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
  ) => {
    try {
      const firestore = getFirestore();
  
      await firestore
        .collection("orders")
        .doc(orderId)
        .update({
          status: "finalizada"
        })
        .then(() => {
          console.log("atualizou");
          dispatch({
            type: "CLOSE_ORDER",
            orderId
          });
        });
      return true;
    } catch (error) {
      if (error) {
        console.error("Error on closingOrder: ", error);
        return false;
      }
    }
  };
  
  export const clearCurrentOrder = () => dispatch => {
    dispatch({
      type: "CLEAR_CURRENT_ORDER"
    });
    dispatch({
      type: "CLOSE_ORDER_LABEL"
    });
  };
  
  export const updateCurrentOrder = currentOrder => dispatch => {
    dispatch({
      type: "UPDATE_CURRENT_ORDER",
      currentOrder
    });
    dispatch({
      type: "OPEN_ORDER_LABEL_BANNER"
    });
  };
  
  export function setOrderHistory(history) {
    return {
      type: "SET_HISTORY",
      history
    };
  }
  
  export function setCurrentOrder(currentOrder) {
    return {
      type: "SET_CURRENT_ORDER",
      currentOrder
    };
  }
  
  export function setPreviousRoute(previousRoute) {
    return {
      type: "SET_PREVIOUS_ROUTE",
      previousRoute
    };
  }
  
  export function removeOrderItem(item) {
    return {
      type: "REMOVE_ORDER_ITEM",
      item
    };
  }
  