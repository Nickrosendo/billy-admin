import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import reducer from './reducers';

import firebase from '../config/firebase';

let ssrCompose;
if (typeof window!=='undefined') {
	ssrCompose=compose(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })), reactReduxFirebase(firebase, { attachAuthIsReady: true}), reduxFirestore(firebase));
	if (typeof window.__REDUX_DEVTOOLS_EXTENSION__==='function') {
		ssrCompose=compose(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),  reactReduxFirebase(firebase, { attachAuthIsReady: true}), reduxFirestore(firebase), window.__REDUX_DEVTOOLS_EXTENSION__());
	}
}

export default createStore(reducer, ssrCompose);