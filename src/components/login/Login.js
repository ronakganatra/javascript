import PropTypes from "prop-types";
import React from "react";
import { intlShape, injectIntl } from "react-intl";
import { redirectToOAuthUrl } from "../../functions/auth";

// Components.
import LoginForm from "./LoginForm";


/**
 * Login component for logging in to MyYoast.
 */
class Login extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			email: "",
			password: "",
			rememberMe: false,
			otp: "",
		};

		this.onRememberCheck = this.onRememberCheck.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
		this.onUpdateEmail = this.onUpdateField.bind( this, "email" );
		this.onUpdatePassword = this.onUpdateField.bind( this, "password" );
		this.onUpdateOTP = this.onUpdateField.bind( this, "otp" );
	}

	/**
	 * Event listener, listening to changes of the
	 * 'remember me' checkbox (e.g. whether it is checked or not).
	 * @param {Object} event the input change event.
	 * @returns {void}
	 */
	onRememberCheck( event ) {
		this.setState( {
			rememberMe: event.target.checked,
		} );
	}

	/**
	 * Updates the specified field in the state,
	 * to be used as callback functions in text input fields.
	 *
	 * @param {string} field the field in the state that should be updated.
	 * @param {Object} event the input field change event.
	 * @returns {void}
	 */
	onUpdateField( field, event ) {
		const obj = {};
		obj[ field ] = event.target.value;
		this.setState( obj );
	}

	/**
	 * Handles the login submit by attempting a login.
	 *
	 * @param {Object} event The event.
	 *
	 * @returns {void}
	 */
	handleSubmit( event ) {
		event.preventDefault();
		if ( this.props.loading ) {
			return;
		}
		const data = { email: this.state.email, password: this.state.password, rememberMe: this.state.rememberMe, otp: this.state.otp };
		this.props.attemptLogin( data );
	}

	shouldComponentUpdate() {
		if ( this.props.oauthError && this.props.loggedIn ) {
			redirectToOAuthUrl();
			return false;
		}
		return true;
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<LoginForm
				rememberMe={ this.state.rememberMe }
				email={ this.state.email }
				password={ this.state.password }
				errors={ this.props.error }
				loading={ this.props.loading }
				onUpdateEmail={ this.onUpdateEmail }
				onUpdatePassword={ this.onUpdatePassword }
				onUpdateOTP={ this.onUpdateOTP }
				onRememberCheck={ this.onRememberCheck }
				handleSubmit={ this.handleSubmit }
				requireOTP={ this.props.requireOTP }
			/>
		);
	}
}

Login.propTypes = {
	intl: intlShape.isRequired,
	error: PropTypes.object,
	loading: PropTypes.bool,
	loggedIn: PropTypes.bool,
	oauthError: PropTypes.bool,
	requireOTP: PropTypes.bool.isRequired,
	attemptLogin: PropTypes.func.isRequired,
};

Login.defaultProps = {
	error: null,
	loading: false,
	requireOTP: false,
};

export default injectIntl( Login );
