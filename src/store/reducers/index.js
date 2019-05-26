import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import orders from './orders';

const root = combineReducers({	
    orders,
	firestore: firestoreReducer,
	firebase: firebaseReducer
});

export default root;

