export const fetchProfile = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  const uid = firebase.auth().getUid();
  console.log("uid: ", uid);
  if (uid) {
    firestore
      .collection('restaurants')
      .doc(uid)
      .get()
      .then(doc => {
        const profile = doc.data();
        dispatch({ type: 'SET_PROFILE', profile });
      });
  }
};

export const signIn = credentials => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();

  return firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(({ user }) => {
      const firestore = getFirestore();
      const uid = user.uid;

      if (uid) {
        firestore
          .collection('restaurants')
          .doc(uid)
          .get()
          .then(doc => {
            const profile = doc.data();
            dispatch({ type: 'SET_PROFILE', profile });
          });
      }
      dispatch({ type: 'LOGIN_SUCCESS' });
    })
    .catch(error => {
      dispatch({ type: 'LOGIN_ERROR', error });
      return setTimeout(() => dispatch({ type: 'CLEAR_AUTH_ERRORS' }), 5000);
    });
};

export const signUp = newRestaurant => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  
  firebase
    .auth()
    .createUserWithEmailAndPassword(newRestaurant.email, newRestaurant.password)
    .then(res => {
      const profile = {
        email: newRestaurant.email,
        ownerName: newRestaurant.ownerName,
        phone: newRestaurant.phone,
        address: newRestaurant.address,
        companyName: newRestaurant.companyName,
        logoUrl: newRestaurant.logoUrl,
        cnpj: newRestaurant.cnpj,
        menu: []
      };

      firestore
        .collection('restaurants')
        .doc(res.user.uid)
        .set(profile);

      dispatch({ type: 'SET_PROFILE', profile });
      dispatch({ type: 'SIGNUP_SUCCESS' });
    })
    .catch(error => {
      dispatch({ type: 'SIGNUP_ERROR', error });
      return setTimeout(() => dispatch({ type: 'CLEAR_AUTH_ERRORS' }), 5000);
    });
};

export const signOut = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signOut()
    .then(() => dispatch({ type: 'LOGOUT_SUCCESS' }))
    .catch(err => {
      console.error('Erro ao deslogar usuario: ', err);
    });
};
