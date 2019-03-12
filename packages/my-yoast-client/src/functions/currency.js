/**
 * Format currency to a decimal format
 *
 * @param {number} cents Currency amount to convert.
 * @returns {number} Converted currency.
 */
module.exports = function( cents ) {
	return cents / 100;
};
