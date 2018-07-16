import { connect } from "react-redux";
import ResetPasswordEmailPage from "../components/login/ResetPasswordEmailPage";
import { doRequest, prepareInternalRequest } from "../functions/api";
import { getUserId } from "../functions/auth";
import getEnv from "../functions/getEnv";

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		attemptResetPasswordEmail: ( data ) => {
			let params = data;
			let request = prepareInternalRequest( `Customers/sendResetPasswordEmail/`, "POST", params );
			doRequest( request )
			.then( () => {
				document.location.href = getEnv( "LOGIN_URL", "http://my.yoast.test:3001/emailSuccess" );
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
)( ResetPasswordEmailPage );

export default ResetPasswordContainer;
