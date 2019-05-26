
const INITIAL_STATE={
	drawerOpen: false,
	orderLabelBannerOpen: false,
	orderLabelDrawerOpen: false
};

export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case 'OPEN_DRAWER_MENU':
			return {
				...state,
				drawerOpen: true
			};
		case 'CLOSE_DRAWER_MENU':
			return {
				...state,
				drawerOpen: false
			};
		case 'TOGGLE_ORDER_LABEL_BANNER':
			const orderLabelBannerOpen=state.orderLabelBannerOpen? (false):(true);
			return {
				...state,
				orderLabelBannerOpen
			}
		case 'OPEN_ORDER_LABEL_BANNER':
			return {
				...state,
				orderLabelBannerOpen: true
			}
		case 'CLOSE_ORDER_LABEL_BANNER':
			return {
				...state,
				orderLabelBannerOpen: false
			}
		case 'CLOSE_ORDER_LABEL':
			return {
				...state,
				orderLabelBannerOpen: false,
				orderLabelDrawerOpen: false
			}
		case 'TOGGLE_ORDER_LABEL_DRAWER':
			const updatedOrderLabelState = {
				orderLabelDrawerOpen: state.orderLabelDrawerOpen ? false : true,
				orderLabelBannerOpen: state.orderLabelDrawerOpen ? true : false
			}
			return {
				...state,
				...updatedOrderLabelState
			}
		default:
			return state;
	}
};