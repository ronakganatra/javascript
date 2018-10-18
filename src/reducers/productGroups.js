import {
	GET_ALL_PRODUCT_GROUPS_FAILURE,
	GET_ALL_PRODUCT_GROUPS_REQUEST,
	GET_ALL_PRODUCT_GROUPS_SUCCESS,
} from "../actions/productGroups";
import _union from "lodash/union";

/*
 * Initial state
 */

const rootState = {
	entities: {
		productGroups: {
			byId: {},
			allIds: [],
		},
	},
	ui: {
		productGroups: {
			requesting: false,
			error: "",
		},
	},
};

/*
 * Reducers
 */

/**
 * A reducer for the ui productGroups object.
 *
 * @param {Object} state The current state of the ui productGroups object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated ui product object.
 */
export function uiAllProductGroupsReducer( state = rootState.ui.productGroups, action ) {
	switch ( action.type ) {
		case GET_ALL_PRODUCT_GROUPS_REQUEST:
			return Object.assign( {}, state, {
				requesting: true,
				error: "",
			} );
		case GET_ALL_PRODUCT_GROUPS_SUCCESS:
			return Object.assign( {}, state, {
				requesting: false,
			} );
		case GET_ALL_PRODUCT_GROUPS_FAILURE:
			return Object.assign( {}, state, {
				requesting: false,
				error: action.message,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the byIdProductGroups object.
 *
 * @param {Object} state The current state of the byIdProductGroups object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated byIdProductGroups object.
 */
export function byIdProductGroupsReducer( state = rootState.entities.productGroups.byId, action ) {
	let productGroups;

	switch ( action.type ) {
		case GET_ALL_PRODUCT_GROUPS_SUCCESS:
			productGroups = Object.assign( {}, state );

			action.productGroups.forEach( ( productGroup ) => {
				productGroups[ productGroup.id ] = Object.assign( {}, productGroup );
			} );

			return productGroups;

		default:
			return state;
	}
}

/**
 * A reducer for the allIdsProductGroups array.
 *
 * @param {Array} state The current state of the allIdsProductGroups array.
 * @param {Object} action The current action received.
 * @returns {Array} The updated allIdsProductGroups array.
 */
export function allIdsProductGroupsReducer( state = rootState.entities.productGroups.allIds, action ) {
	switch ( action.type ) {
		case GET_ALL_PRODUCT_GROUPS_SUCCESS:
			return _union( state, action.productGroups.map( productGroup => productGroup.id ) );
		default:
			return state;
	}
}
