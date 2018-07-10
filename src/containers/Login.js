import { connect } from "react-redux";
import Login from "../components/login/Login";
import {
	authenticate,
	directToIntendedDestination,
	hasWPCookie,
	redirectToOAuthUrl,
	shouldBeRedirected,
} from "../functions/auth";
import getEnv from "../functions/getEnv";
import { doRequest, prepareInternalRequest } from "../functions/api";

export const mapStateToProps = ( state, ownProps ) => {
	return {};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		/**
		 * Opens the door to the treasures of MyYoast,
		 * if their credentials are correctly filled in.
		 *
		 * @param {Object} data An object containing an email address, password and a "remember me" value.
		 *
		 * @returns {void}
		 */
		attemptLogin: ( data ) => {
			let params = { email: data.email, password: data.password, rememberMe: data.rememberMe };
			let request = prepareInternalRequest( "Customers/login/", "POST", params, { credentials: "include" } );
			doRequest( request )
				.then( () => {
					authenticate( dispatch )
						.then( () => {
							// Redirect to the homepage or where the user intended to go.
							if ( shouldBeRedirected() ) {
								directToIntendedDestination();
							} else {
								document.location.href = getEnv( "HOME_URL", "http://my.yoast.test:3001" );
							}
						} )
						.catch( () => {
							// If the user has already logged in on WordPress, but the OAuth authentication fails, redirect to OAuth manually.
							if ( hasWPCookie() ) {
								redirectToOAuthUrl();
							}
							// Else, don't do anything while the user fills out the login/signup forms.
						} );
				} )
				.catch( ( error ) => {
					this.setState( {
						errors: error,
					} );
				} );
		},
	};
};

const LoginContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( Login );

export default LoginContainer;
