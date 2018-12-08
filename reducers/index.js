import * as actions from '../actions'

export const INITIAL_STATE = {}

function decks(state = INITIAL_STATE, action) {
	switch (action.type) {
		case actions.ADD_DECK:
			return { ...state, ...action.payload }
		case actions.GET_DECKS:
			return { ...state, ...action.payload }
		default:
			return state
	}
}

export default decks
