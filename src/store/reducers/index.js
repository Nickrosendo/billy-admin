import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import auth from './auth';
import orders from './orders';

const root = combineReducers({
  auth,
  orders,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default root;
