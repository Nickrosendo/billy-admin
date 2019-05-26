const INITIAL_STATE={
	currentOrder: {},
	history: []
};

let ACTIONS={
	SET_HISTORY: ({ ...state }, { history }) => ({ ...state, history }),
	START_ORDER: ({ ...state }, { order }) => ({ ...state, currentOrder: { ...order } }),
	CONFIRM_ORDER: ({ ...state }, { order }) => ({ ...state, currentOrder: { ...order }, history: [...state.history, { ...order }] }),
	SET_CURRENT_ORDER: ({ ...state }, { currentOrder }) => {
		const newOrder=!state.history.some(o => o.id===currentOrder.id)
		if (newOrder) {
			return ({ ...state, currentOrder, history: [...state.history, currentOrder] })
		} else {
			return ({ ...state, currentOrder, history: [...state.history] })
		}
	},
	UPDATE_CURRENT_ORDER: ({ ...state }, { currentOrder }) => {
		let updatedHistory=[...state.history]
		const currentOrderIndex=state.history.findIndex(o => o.id===currentOrder.id)
		let updatedCurrentOrder={
			...state.currentOrder, ...currentOrder
		}
		if (updatedCurrentOrder.items.length===0) {
			updatedCurrentOrder={items: []}
		}
		if (currentOrderIndex!==-1) {
			if (currentOrder.items.length===0) {
				updatedHistory=updatedHistory.filter(order => order._id!==currentOrder._id)
			} else {
				updatedHistory[currentOrderIndex]={ ...currentOrder }
			}
		}
		return ({ ...state, history: updatedHistory, currentOrder: updatedCurrentOrder })
	},
	// ADD_CURRENT_ORDER_ITEM: ({ ...state}, { item }) => ({ ...state, currentOrder: { ...state.currentOrder, }})
	REMOVE_CURRENT_ORDER_ITEM: ({ items, ...state }, { itemId }) => ({
		todos: items.filter(i => i._id!==itemId),
		...state
	}),
	CLOSE_ORDER: ({ ...state }, { orderId }) => {
		console.log('orderId: ', orderId)
		const orderIndex=state.history.findIndex(o => o.id===orderId)
		if (orderIndex!==-1) {
			let closedOrder={ ...state.history[orderIndex] }
			let updatedHistory=[...state.history]
			closedOrder.status='finalizada'
			updatedHistory[orderIndex]=closedOrder
			if (orderId===state.currentOrder.id) {
				return ({ ...state, history: updatedHistory, currentOrder: closedOrder })
			}
			return ({ ...state, history: updatedHistory })
		}
		return ({ ...state })
	},
	CLEAR_CURRENT_ORDER: ({ ...state }) => {
			return ({ ...state, currentOrder: {items: []}})
	}
};

export default (state=INITIAL_STATE, action) => action&&ACTIONS[action.type]? ACTIONS[action.type](state, action):state;