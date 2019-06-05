export const signIn=credentials => (dispatch, getState, { getFirebase }) => {
	const firebase=getFirebase();
	
	return firebase.auth().signInWithEmailAndPassword(
		credentials.email,
		credentials.password
	).then(() => {
		dispatch({ type: 'LOGIN_SUCCESS' });
	})  
		.catch(error => {
			dispatch({ type: 'LOGIN_ERROR', error });
			return setTimeout(() => dispatch({ type: 'CLEAR_AUTH_ERRORS' }), 5000);
		});
};
