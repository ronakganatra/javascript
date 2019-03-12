import "whatwg-fetch";
import { prepareInternalRequest, doRequest } from "../functions/api";

/*
 * Action types
 */

export const GET_ALL_PRODUCTS_REQUEST = "GET_ALL_PRODUCTS_REQUEST";
export const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS";
export const GET_ALL_PRODUCTS_FAILURE = "GET_ALL_PRODUCTS_FAILURE";

/*
 * Action creators
 */

/**
 * An action creator for the get all products request action.
 *
 * @returns {Object} A get all products action.
 */
export function getAllProductsRequest() {
	return {
		type: GET_ALL_PRODUCTS_REQUEST,
	};
}

/**
 * An action creator for the get all products success action.
 * @param {Object} products The products json object
 * @returns {Object} A get all products success action.
 */
export function getAllProductsSuccess( products ) {
	return {
		type: GET_ALL_PRODUCTS_SUCCESS,
		products: products,
	};
}

/**
 * An action creator for the get all products failure action.
 *
 * @param {string} errorMessage The error message that was returned.
 *
 * @returns {Object} A get all products failure action.
 */
export function getAllProductsFailure( errorMessage ) {
	return {
		type: GET_ALL_PRODUCTS_FAILURE,
		message: errorMessage,
	};
}

/**
 * An action creator for the get all products action.
 *
 * @returns {Object} A get all products action.
 */
export function getAllProducts() {
	return ( dispatch ) => {
		dispatch( getAllProductsRequest() );

		const request = prepareInternalRequest( "products/" );

		return doRequest( request )
			.then( json => dispatch( getAllProductsSuccess( json ) ) )
			.catch( error => dispatch( getAllProductsFailure( error.message ) ) );
	};
}
