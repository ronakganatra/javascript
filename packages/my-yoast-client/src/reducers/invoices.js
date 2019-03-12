import { OPEN_INVOICES_MODAL, CLOSE_INVOICES_MODAL } from "../actions/invoices";

/**
 * Initial state
 */
const rootState = {
	entities: {
		orders: {
			byId: {},
			allIds: [],
		},
	},
	ui: {
		invoiceModal: {
			invoicesModalIsOpen: false,
			invoicesModalOrderId: "",
			error: null,
		},
	},
};

/**
 * Reducers
 */

/**
 * A reducer for the invoices object within the ui object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated invoices object.
 */
export function uiInvoicesReducer( state = rootState.ui.invoiceModal, action ) {
	switch ( action.type ) {
		case OPEN_INVOICES_MODAL:
			return Object.assign( {}, state, {
				invoicesModalIsOpen: true,
				invoicesModalOrderId: action.orderId,
				error: null,
			} );
		case CLOSE_INVOICES_MODAL:
			return Object.assign( {}, state, {
				invoicesModalIsOpen: false,
				invoicesModalOrderId: "",
			} );
		default:
			return state;
	}
}
