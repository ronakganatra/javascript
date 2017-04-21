/**
 * Format currency to a decimal format
 *
 * @param {number} cents Currency amount to covert.
 * @returns {number} Converted currency.
 */
export function formatAmount( cents ) {
	return cents / 100;
}
