/**
 * Returns the given env variable, or the default instead. Prefixed with REACT_APP.
 *
 * @param {string} key The key of the env variable.
 * @param {string} defaultValue The default to return if the env var is not set.
 * @returns {string} The value in the env variable.
 */
export default function getEnv( key, defaultValue ) {
	key = "REACT_APP_" + key;

	if ( typeof process.env[ key ] !== "undefined" ) {
		return process.env[ key ];
	}

	return defaultValue;
}
