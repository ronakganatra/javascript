import { getLearndashHost, getMyYoastHost, getWooCommerceHost } from "./functions/helpers";

export default class Api {
	/**
	 * Creates an API object using the given access token.
	 *
	 * @param {string}   accessToken       The access token to use.
	 * @param {function} updateAccessToken A function to update the access token.
	 */
	constructor( accessToken, updateAccessToken ) {
		this.host = getMyYoastHost();
		this.wooHost = getWooCommerceHost();
		this.learndashHost = getLearndashHost();

		this.accessToken       = accessToken;
		this.userId            = null;
		this.userRoles         = null;
		this.wooAccessToken    = null;
		this.updateAccessToken = updateAccessToken;

		this.handleJSONReponse = this.handleJSONReponse.bind( this );

		if ( accessToken !== null ) {
			this.getWooAccessToken();
		}
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

		return fetch( url, { method: "GET" } ).then( this.handleJSONReponse );
	}

	saveNote( note ) {
		let url    = this.host + "/api/CustomerNotes";
		let method = "POST";

		if ( note.id ) {
			url   += "/" + note.id;
			method = "PATCH";
			delete note.id;
		}

		url += "?access_token=" + this.accessToken;

		return fetch(
			url,
			{
				method,
				body: JSON.stringify( note ),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			}
		).then( this.handleJSONReponse );
	}

	getWooUrl( shopId ) {
		let shopPostfix = "";

		switch( shopId ) {
			case 2:
				shopPostfix = "/eu";
				break;
			case 7:
				shopPostfix = "/uk";
				break;
			default:
				break;
		}

		return this.wooHost + shopPostfix + "/wp-json";
	}

	wooTransferPreview( fromId, toId, shopId ) {
		return this.getWooAccessToken().then( () => {
			let url = this.getWooUrl( shopId ) + `/yoast-account-transfer/v1/transfer`;
			url += `?from_id=${ fromId }&to_id=${ toId }&access_token=${ this.wooAccessToken }`;

			return fetch( url, { method: "GET" } ).then( this.handleJSONReponse );
		} );
	}

	learndashTransferPreview( fromId, toId ) {
		return this.getWooAccessToken().then( () => {
			let url = this.learndashHost + `/wp-json/yoast-account-transfer/v1/transfer`;
			url += `?from_id=${ fromId }&to_id=${ toId }&access_token=${ this.wooAccessToken }`;

			return fetch( url, { method: "GET" } ).then( this.handleJSONReponse );
		} );
	}

	wooTransfer( fromId, toId, shopId ) {
		return this.getWooAccessToken().then( () => {
			let data = new FormData();
			let url  = this.getWooUrl( shopId ) + `/yoast-account-transfer/v1/transfer`;
			url += `?access_token=${ this.wooAccessToken }`;

			data.append( "from_id", fromId );
			data.append( "to_id", toId );

			return fetch( url, { method: "POST", body: data } ).then( this.handleJSONReponse );
		} );
	}

	learndashTransfer( fromId, toId ) {
		return this.getWooAccessToken().then( () => {
			let data = new FormData();
			let url = this.learndashHost + `/wp-json/yoast-account-transfer/v1/transfer`;
			url += `?access_token=${ this.wooAccessToken }`;

			data.append( "from_id", fromId );
			data.append( "to_id", toId );

			return fetch( url, { method: "POST", body: data } ).then( this.handleJSONReponse );
		} );
	}

	wooRefund( orderId, shopId ) {
		return this.getWooAccessToken().then( () => {
			let url = this.getWooUrl( shopId ) + `/yoastcom/v1/refund/${orderId}`;
			url += `?access_token=${ this.wooAccessToken }`;

			return fetch( url, { method: "POST" } ).then( this.handleJSONReponse );
		} );
	}

	/**
	 * Handles a JSON response.
	 *
	 * @param response The response.
	 *
	 * @returns {Promise.<*>} A promise with the parsed JSON data.
	 */
	handleJSONReponse( response ) {
		if ( ! response ) {
			return Promise.reject( "Could not read response data!" );
		}

		if ( response.status === 200 ) {
			return response.json();
		}

		if ( response.status === 401 ) {
			this.accessToken = null;
			this.userId = null;
			this.wooAccessToken = null;
			this.updateAccessToken( null );
		}

		return response.json()
			.then( ( json ) => {
				let error = new Error( `Invalid status code: ${ response.status }` );

				if ( json.code && json.message ) {
					error = new Error( json.message, json.code );
				}

				throw error;
			} );
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

		return fetch( url, { method: "POST", body: data } ).then( this.handleJSONReponse );
	}

	enableCustomer( customerId ) {
		let url = this.host + "/api/Customers/" + customerId + "/enable?access_token=" + this.accessToken;

		return fetch( url, { method: "POST" } ).then( this.handleJSONReponse );
	}

	assignConfigurationServiceRequest( configurationServiceRequestId ) {
		let url = this.host + "/api/ConfigurationServiceRequests/" + configurationServiceRequestId + "/assign?access_token=" + this.accessToken;

		return fetch( url, { method: "POST" } ).then( this.handleJSONReponse );
	}

	completeConfigurationServiceRequest( configurationServiceRequestId, report, backupCreated, importDone, searchConsoleConnected ) {
		let url = this.host + "/api/ConfigurationServiceRequests/" + configurationServiceRequestId + "/complete?access_token=" + this.accessToken;
		return fetch( url,
			{
				method: "POST",
				body: JSON.stringify( { report, backupCreated, importDone, searchConsoleConnected } ),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			} )
			.then( this.handleJSONReponse );
	}

	getCurrentUser() {
		let url = this.host + `/api/Customers/current?access_token=${ this.accessToken }`;

		if ( this.userId !== null ) {
			return Promise.resolve( this.userId );
		}

		return fetch( url, { method: "GET" } )
			.then( this.handleJSONReponse )
			.then( response => {
				this.userId = response.id;
				return Promise.resolve( this.userId );
			} );
	}

	getUserRoles() {
		if ( this.userRoles !== null ) {
			return Promise.resolve( this.userRoles );
		}

		return this.getCurrentUser().then( id => {
			let url = this.host + `/api/Customers/${ id }/roles?access_token=${ this.accessToken }`;

			return fetch( url, { method: "GET" } )
		} ).then(
			this.handleJSONReponse
		).then( roles => {
			this.userRoles = roles.map( role => role.name );
			return Promise.resolve( this.userRoles );
		} )
	}

	getWooAccessToken() {
		return this.getCurrentUser().then( () => {
			let url = this.host + `/api/Customers/${ this.userId }/identities?access_token=${ this.accessToken }`;

			if ( this.wooAccessToken !== null ) {
				return Promise.resolve( this.wooAccessToken );
			}

			return fetch( url, { method: "GET" } )
				.then( this.handleJSONReponse )
				.then( response => {
					this.wooAccessToken = response[0].credentials.accessToken;
					return Promise.resolve( this.wooAccessToken );
				} );
		} );
	}
}
