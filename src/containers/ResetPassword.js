import { connect } from "react-redux";
import ResetPasswordPage from "../components/login/ResetPasswordPage";
import { doRequest, prepareInternalRequest } from "../functions/api";
import { getUserId } from "../functions/auth";
import getEnv from "../functions/getEnv";

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		attemptResetPassword: ( data ) => {
			let params = data;
			let userId = getUserId();
			let request = prepareInternalRequest( `Customers/${userId}/resetPassword/`, "PATCH", params );
			doRequest( request )
			.then( () => {
				document.location.href = getEnv( "LOGIN_URL", "http://my.yoast.test:3001/login" );
			}
			)
			.catch( ( error ) => {
				return error;
			} );
		},
	};
};

export const mapStateToProps = ( state ) => {
	return state.router;
};

const ResetPasswordContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( ResetPasswordPage );

export default ResetPasswordContainer;
