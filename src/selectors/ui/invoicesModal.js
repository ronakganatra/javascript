/**
 * Returns whether the invoices modal is open state.
 *
 * @param {Object} state Application state.
 *
 * @returns {boolean} The invoices modal is open state.
 */
export function isInvoicesModalOpen( state ) {
	return state.ui.invoiceModal.invoicesModalIsOpen;
}

/**
 * Returns the invoices modal order id state.
 *
 * @param {Object} state Application state.
 *
 * @returns {string} The invoices modal order id state.
 */
export function getInvoicesModalOrderId( state ) {
	return state.ui.invoiceModal.invoicesModalOrderId;
}

/**
 * Returns the invoices modal error state.
 *
 * @param {Object} state Application state.
 *
 * @returns {object} The invoices modal error state.
 */
export function getInvoicesModalError( state ) {
	return state.ui.invoiceModal.error;
}
