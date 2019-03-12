/**
 * Generates a search callback function for the passed query.
 *
 * @param {Function} search The search function.
 * @param {Object}   query  The query to execute with this callback.
 *
 * @returns {Function} A callback function that calls the search function with the query.
 */
export function getSearchCallback( search, query ) {
	return function () {
		search( query );
	};
}
