import { connect } from "react-redux";
import ResetPasswordPage from "../components/login/ResetPasswordPage";
import { doRequest, prepareInternalRequest } from "../functions/api";
import getEnv from "../functions/getEnv";

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		attemptResetPassword: ( data ) => {
			let params = data;
			let request = prepareInternalRequest( "Customers/resetPassword/", "PATCH", params );
			doRequest( request )
			.then( () => {
				document.location.href = getEnv( "LOGIN_URL", "http://my.yoast.test:3001/resetSuccess" );
			}
			)
			.catch( ( error ) => {
				return error;
			} );
		},
	};
};

export const mapStateToProps = ( state ) => {
	return {
		stateRouter: state.router,
		email: state.user.data.profile.email,
	};
};

const ResetPasswordContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( ResetPasswordPage );

export default ResetPasswordContainer;
