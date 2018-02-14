/*
 * Action types
 */

export const OPEN_INVOICES_MODAL = "OPEN_INVOICES_MODAL";
export const CLOSE_INVOICES_MODAL = "CLOSE_INVOICES_MODAL";

/*
 * Action creators
 */

/**
 * An action creator for the open invoices modal action.
 *
 * @param {string} orderId The id of the order for which the invoices should be shown.
 *
 * @returns {Object} An open invoices modal action.
 */
export function openInvoicesModal( orderId ) {
	return {
		type: OPEN_INVOICES_MODAL,
		orderId: orderId,
	};
}

/**
 * An action creator for the close invoices modal action.
 *
 * @returns {Object} The close invoices modal action.
 */
export function closeInvoicesModal() {
	return {
		type: CLOSE_INVOICES_MODAL,
	};
}
