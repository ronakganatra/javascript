import { GET_ALL_PRODUCTS_FAILURE, GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS } from "../actions/products";
import _union from "lodash/union";

/*
 * Initial state
 */

const rootState = {
	entities: {
		products: {
			byId: {},
			allIds: [],
		},
	},
	ui: {
		products: {
			requesting: false,
			error: "",
		},
	},
};

/*
 * Reducers
 */

/**
 * A reducer for the ui products object.
 *
 * @param {Object} state The current state of the ui products object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated ui product object.
 */
export function uiAllProductsReducer( state = rootState.ui.products, action ) {
	switch ( action.type ) {
		case GET_ALL_PRODUCTS_REQUEST:
			return Object.assign( {}, state, {
				requesting: true,
				error: "",
			} );
		case GET_ALL_PRODUCTS_SUCCESS:
			return Object.assign( {}, state, {
				requesting: false,
			} );
		case GET_ALL_PRODUCTS_FAILURE:
			return Object.assign( {}, state, {
				requesting: false,
				error: action.message,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the byIdProducts object.
 *
 * @param {Object} state The current state of the byIdProducts object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated byIdProducts object.
 */
export function byIdProductsReducer( state = rootState.entities.products.byId, action ) {
	let products;

	switch ( action.type ) {
		case GET_ALL_PRODUCTS_SUCCESS:
			products = Object.assign( {}, state );

			action.products.forEach( ( product ) => {
				products[ product.id ] = Object.assign( {}, product );
			} );

			return products;

		default:
			return state;
	}
}

/**
 * A reducer for the allIdsProducts array.
 *
 * @param {Array} state The current state of the allIdsProducts array.
 * @param {Object} action The current action received.
 * @returns {Array} The updated allIdsProducts array.
 */
export function allIdsProductsReducer( state = rootState.entities.products.allIds, action ) {
	switch ( action.type ) {
		case GET_ALL_PRODUCTS_SUCCESS:
			return _union( state, action.products.map( product => product.id ) );
		default:
			return state;
	}
}
