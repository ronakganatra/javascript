import "whatwg-fetch";
import { prepareInternalRequest, doRequest } from "../functions/api";

/*
 * Action types
 */

export const GET_PRODUCT_GROUPS_REQUEST = "GET_PRODUCT_GROUPS_GROUP_REQUEST";
export const GET_PRODUCT_GROUPS_SUCCESS = "GET_PRODUCT_GROUPS_GROUP_SUCCESS";
export const GET_PRODUCT_GROUPS_FAILURE = "GET_PRODUCT_GROUPS_GROUP_FAILURE";

/*
 * Action creators
 */

/**
 * An action creator for the get all product groups request action.
 *
 * @returns {Object} A get all product groups action.
 */
export function getProductGroupsRequest() {
	return {
		type: GET_PRODUCT_GROUPS_REQUEST,
	};
}

/**
 * An action creator for the get all product groups success action.
 * @param {Object} productGroups The product groups json object
 * @returns {Object} A get all product groups success action.
 */
export function getProductGroupsSuccess( productGroups ) {
	return {
		type: GET_PRODUCT_GROUPS_SUCCESS,
		productGroups: productGroups,
	};
}

/**
 * An action creator for the get all product groups failure action.
 *
 * @param {string} errorMessage The error message that was returned.
 *
 * @returns {Object} A get all product groups failure action.
 */
export function getProductGroupsFailure( errorMessage ) {
	return {
		type: GET_PRODUCT_GROUPS_FAILURE,
		message: errorMessage,
	};
}

/**
 * An action creator for the get all product groups action.
 *
 * @returns {Object} A get all product groups action.
 */
export function getProductGroups() {
	return ( dispatch ) => {
		dispatch( getProductGroupsRequest() );

		const request = prepareInternalRequest( "productGroups/" );

		return doRequest( request )
			.then( json => dispatch( getProductGroupsSuccess( json ) ) )
			.catch( error => dispatch( getProductGroupsFailure( error.message ) ) );
	};
}
