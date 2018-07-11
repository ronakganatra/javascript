import { connect } from "react-redux";
import Login from "../components/login/Login";
import { loginRequest } from "../actions/login";

export const mapStateToProps = ( state, ownProps ) => {
	return Object.assign( {}, state.ui.login );
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
			dispatch( loginRequest( params ) );
		},
	};
};

const LoginContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( Login );

export default LoginContainer;
