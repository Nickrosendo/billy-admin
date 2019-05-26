
const INITIAL_STATE = {
	isAuth: false,
	loginError: null,
	signUpError: null,
	name: 'Nicolas'
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'CLEAR_AUTH_ERRORS':
			return {
				...state,
				loginError: null,
				signUpError: null
			};
		case 'LOGIN_SUCCESS':
			return {
				...state,
				isAuth: true,
				loginError: null
			};
		case 'LOGIN_ERROR':
			console.error('Erro ao identificar usuario:: ', action.error);
			return {
				...state,
				loginError: action.error && action.error.message ? action.error.message : 'Erro ao identificar usuario'
			};
		case 'LOGOUT_SUCCESS':
			console.log('logout success');
			return state;
		case 'SIGNUP_SUCCESS':
			return {
				...state,
				signUpError: null
			};
		case 'SIGNUP_ERROR':
			console.error('Erro ao cadastrar usuario:: ', action.error);
			return {
				...state,
				signUpError: action.error && action.error.message ? action.error.message : 'Erro ao cadastrar usuario'
			};
		default:
			return state;
	}
};