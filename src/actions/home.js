import getFeed from "yoast-components/utils/getFeed";

export const GET_FEED_REQUEST = "GET_FEED_REQUEST";
export const GET_FEED_SUCCESS = "GET_FEED_SUCCESS";
export const GET_FEED_FAILURE = "GET_FEED_FAILURE";


/**
 * An action creator for the server request action.
 *
 * @returns {Object} A server request action.
 */
export function getFeedRequest() {
	return {
		type: GET_FEED_REQUEST,
	};
}

/**
 * An action creator for the get feed success action.
 *
 * @param {Object} blogFeed The feed that was retrieved.
 *
 * @returns {Object} A get feed success action.
 */
export function getFeedSuccess( blogFeed ) {
	return {
		type: GET_FEED_SUCCESS,
		blogFeed,
	};
}

/**
 * An action creator for the get feed failure action.
 *
 * @param {string} error The error.
 *
 * @returns {Object} A get feed failure action.
 */
export function getFeedFailure( error ) {
	return {
		type: GET_FEED_FAILURE,
		blogFeedError: error,
	};
}

/**
 * An action creator for the retrieve feed action.
 *
 * @param {number} retrieveNumber The number of blog-posts to retrieve.
 *
 * @returns {Object} A retrieve feed action.
 */
export function retrieveFeed( retrieveNumber ) {
	return ( dispatch ) => {
		dispatch( getFeedRequest() );
		return getFeed( "https://yoast.com/feed/widget/", retrieveNumber )
			.then( blogFeed => dispatch( getFeedSuccess( blogFeed ) ) )
			.catch( error => dispatch( getFeedFailure( error ) ) );
	};
}
