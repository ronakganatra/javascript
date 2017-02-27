import { LOGIN, LOGOUT } from "../actions";

const initialState = {
	user: {
		loggedIn: false,
		data: {}
	}
};

export default (state = initialState, action) => {
	switch ( action.type ) {
		case LOGIN:
			return Object.assign({}, state, {
				user: {
					loggedIn: true,
					data: action.data
				}
			});

		case LOGOUT:
			return Object.assign({}, state, {
				user: {
					loggedIn: false,
					data: {}
				}
			});

		default:
			return state;
	}
}
