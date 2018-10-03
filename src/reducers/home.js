import { GET_FEED_FAILURE, GET_FEED_REQUEST, GET_FEED_SUCCESS } from "../actions/home";

/**
 * Initial state
 */
const rootState = {
	ui: {
		home: {
			// The feed from the Yoast.com SEO blog.
			blogFeed: {
				items: [],
			},

			// Whether or not we are currently retrieving the feed from the Yoast.com SEO blog.
			retrievingFeed: true,

			// Whether or not an error occurred retrieving the blog.
			blogFeedErrorFound: false,

			// The error that was found.
			blogFeedError: null,
		},
	},
};

/**
 * A reducer for the sites object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 *
 * @returns {Object} The updated Sites object.
 */
export function uiHomeReducer( state = rootState.ui.home, action ) {
	switch ( action.type ) {
		case GET_FEED_REQUEST:
			return Object.assign( {}, state, {
				retrievingFeed: true,
			} );
		case GET_FEED_SUCCESS:
			return Object.assign( {}, state, {
				retrievingFeed: false,
				blogFeed: action.blogFeed,
				blogFeedErrorFound: false,
				blogFeedError: null,
			} );
		case GET_FEED_FAILURE:
			return Object.assign( {}, state, {
				retrievingFeed: false,
				blogFeedErrorFound: true,
				blogFeedError: action.blogFeedError,
			} );
		default:
			return state;
	}
}
