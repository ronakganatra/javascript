import { GET_REFUNDS_REQUEST, GET_REFUNDS_SUCCESS, GET_REFUNDS_FAILURE } from "../actions/refunds";
import _union from "lodash/union";

/**
 * Initial state
 */
const rootState = {
	entities: {
		refunds: {
			byId: {},
			allIds: [],
		},
	},
	ui: {
		refunds: {
			retrievingOrders: false,
			error: "",
		},
	},
};

/**
 * Reducers
 */

/**
 * A reducer for the refunds object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated refunds object.
 */
export function uiRefundsReducer( state = rootState.ui.refunds, action ) {
	switch ( action.type ) {
		case GET_REFUNDS_REQUEST:
			return Object.assign( {}, state, {
				retrievingRefunds: true,
				error: null,
			} );
		case GET_REFUNDS_SUCCESS:
			return Object.assign( {}, state, {
				retrievingRefunds: false,
			} );
		case GET_REFUNDS_FAILURE:
			return Object.assign( {}, state, {
				retrievingRefunds: false,
				error: action.error,
			} );
		default:
			return state;
	}
}

/**
 * A reducer for the byIdRefundsReducer list.
 *
 * @param {Object} state The current state of the byIdRefundsReducer list.
 * @param {Object} action The current action received.
 * @returns {Object} The updated byIdRefundsReducer object.
 */
export function byIdRefundsReducer( state = rootState.entities.refunds.byId, action ) {
	let refunds;

	switch ( action.type ) {
		case GET_REFUNDS_SUCCESS:
			refunds = Object.assign( {}, state );

			action.refunds.forEach( ( refund ) => {
				refunds[ refund.id ] = refund;
			} );

			return refunds;

		default:
			return state;
	}
}

/**
 * A reducer for the allIdsRefundsReducer list.
 *
 * @param {Array} state The current state of the allIdsRefundsReducer list.
 * @param {Object} action The current action received.
 * @returns {Array} The updated allIdsRefundsReducer array.
 */
export function allIdsRefundsReducer( state = rootState.entities.refunds.allIds, action ) {
	switch ( action.type ) {
		case GET_REFUNDS_SUCCESS:
			return _union( state, action.refunds.map( refund => refund.id ) );
		default:
			return state;
	}
}
