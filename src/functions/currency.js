/**
 * Format currency to a decimal format
 *
 * @param {number} cents Currency amount to covert.
 * @returns {number} Converted currency.
 */
export function formatAmount( cents ) {
	if ( cents > 0 ) {
		cents /= 100;
	}

	return cents;
}
