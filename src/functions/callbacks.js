/**
 * Generates a search callback function for the passed query.
 *
 * @param {Function} search The search function.
 * @param {Object}   query  The query to execute with this callback.
 *
 * @returns {function(this:BaseResult)}
 */
export function getSearchCallback( search, query ) {
	return function () {
		search( query );
	};
}
