export default class Api {
	/**
	 * Creates an API object using the given access token.
	 *
	 * @param {string} accessToken The access token to use.
	 */
	constructor( accessToken ) {
		if ( window.location.host.indexOf( 'localhost' ) !== -1 ) {
			this.host = "http://localhost:3000";
		} else {
			this.host = "https://my.yoast.com";
		}

		this.accessToken = accessToken;
	}

	/**
	 * Queries the given resource using the given filter.
	 *
	 * @param {string} resource The resource to query.
	 * @param {Object} filter   The filter to apply.
	 *
	 * @returns {Promise.<Object>} A promise that returns the parsed results of the query.
	 */
	search( resource, filter ) {
		let param = encodeURIComponent( JSON.stringify( filter ) );
		let url   = this.host + "/api/" + resource + "?filter=" + param + "&access_token=" + this.accessToken;

		return fetch( url, { method: "GET" } ).then(
			function (response) { return response.json(); }
		);
	}

	/**
	 * Sends a request to create an access token for the given customer.
	 *
	 * @param {string} customerId The ID of the customer to create an access token for.
	 *
	 * @returns {Promise.<Object>} A promise that returns the parsed results of the query. The token is under the id key.
	 */
	createAccessToken( customerId ) {
		let data = new FormData();
		let url  = this.host + "/api/Customers/" + customerId + "/accessTokens?access_token=" + this.accessToken;

		data.append( "ttl", 3600 );

		return fetch( url, { method: "POST", data: data } ).then(
			function (response) { return response.json(); }
		);
	}
}
