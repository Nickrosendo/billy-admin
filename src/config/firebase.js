import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'
import 'firebase/firestore';

// Initialize firebase
const config={
	apiKey: 'AIzaSyA7YYCcLmm9Jo-u3nx_kBYWJFJHjX_hjwU',
	authDomain: 'billy-web.firebaseapp.com',
	databaseURL: 'https://billy-web.firebaseio.com',
	projectId: 'billy-web',
	storageBucket: 'billy-web.appspot.com',
	messagingSenderId: '932748275273'
};

firebase.initializeApp(config);
firebase.firestore();

// const db = firebase.firestore();

// db.collection("orders").get().then((querySnapshot) => {	
// 	querySnapshot.forEach((doc) => {
// 			console.log(doc.data());
// 	});
// });

export default firebase;

export const firestore = firebase.firestore();