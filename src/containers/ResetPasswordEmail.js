import { connect } from "react-redux";
import ResetPasswordEmailPage from "../components/login/ResetPasswordEmailPage";
import { doRequest, prepareInternalRequest } from "../functions/api";
import { getUserId } from "../functions/auth";

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		attemptResetPasswordEmail: ( data ) => {
			let params = data;
			let userId = getUserId();
			let request = prepareInternalRequest( `Customers/${userId}/sendResetPasswordEmail/`, "POST", params );
			doRequest( request )
			.then( () => {
				console.log( "reset email successfully send" );
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
