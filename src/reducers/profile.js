import { PROFILE_UPDATE_EMAIL } from "../actions/profile";

/*
 * Initial state
 */

const initialState = {
	user: {
		data: {
			profile: {
				email: "",
			},
		},
	},
};

/*
 * Reducers
 */

/**
 * A reducer for the site add subscription actions within the ui site object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated state.
 */
export function userProfileEmailReducer( state = initialState.user.data.profile, action ) {
	switch ( action.type ) {
		case PROFILE_UPDATE_EMAIL:
			return Object.assign( {}, state, {
				email: action.email,
			} );
		default:
			return state;
	}
}
