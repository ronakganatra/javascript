import {
	GET_NEWSLETTER_STATUS_REQUEST, GET_NEWSLETTER_STATUS_SUCCESS, GET_NEWSLETTER_STATUS_FAILURE,
	SUBSCRIBE_NEWSLETTER_REQUEST, SUBSCRIBE_NEWSLETTER_SUCCESS, SUBSCRIBE_NEWSLETTER_FAILURE,
	UNSUBSCRIBE_NEWSLETTER_REQUEST, UNSUBSCRIBE_NEWSLETTER_SUCCESS, UNSUBSCRIBE_NEWSLETTER_FAILURE,
} from "../actions/newsletter";


/**
 * Initial state
 */
const rootState = {
	ui: {
		newsletter: {
			loading: false,
			subscribed: "unknown",
			error: {},
		},
	},
};

/**
 * Reducers
 */

/* eslint-disable complexity */
/**
 * A reducer for the orders object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated Orders object.
 */
export function uiNewsletterReducer( state = rootState.ui.newsletter, action ) {
	switch ( action.type ) {
		case GET_NEWSLETTER_STATUS_REQUEST:
		case SUBSCRIBE_NEWSLETTER_REQUEST:
		case UNSUBSCRIBE_NEWSLETTER_REQUEST:
			return Object.assign( {}, state, {
				loading: true,
				error: {},
			} );
		case GET_NEWSLETTER_STATUS_SUCCESS:
		case SUBSCRIBE_NEWSLETTER_SUCCESS:
		case UNSUBSCRIBE_NEWSLETTER_SUCCESS:
			return Object.assign( {}, state, {
				loading: false,
				subscribed: action.status.subscribed,
			} );
		case GET_NEWSLETTER_STATUS_FAILURE:
		case SUBSCRIBE_NEWSLETTER_FAILURE:
		case UNSUBSCRIBE_NEWSLETTER_FAILURE:
			return Object.assign( {}, state, {
				loading: false,
				error: action.error,
			} );
		default:
			return state;
	}
}
/* eslint-enable complexity */
