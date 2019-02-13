import { connect } from "react-redux";
import ResetPasswordPage from "../components/login/ResetPasswordPage";
import { doRequest, prepareInternalRequest } from "../functions/api";
import { resetPasswordFailure, resetPasswordRequest, resetPasswordSuccess } from "../actions/resetPassword";
import { getRouter } from "../selectors/router/router";
import { getResetPassword } from "../selectors/ui/login";

/* eslint-disable require-jsdoc */
export const mapDispatchToProps = ( dispatch ) => {
	return {
		attemptResetPassword: ( data ) => {
			dispatch( resetPasswordRequest() );
			const request = prepareInternalRequest( "Customers/resetPassword/", "PATCH", data );
			doRequest( request )
				.then( ( response ) => {
					dispatch( resetPasswordSuccess() );
					return response;
				} )
				.catch( ( error ) => {
					dispatch( resetPasswordFailure( error ) );
					return error;
				} );
		},
	};
};

export const mapStateToProps = ( state ) => {
	return Object.assign( {}, { stateRouter: getRouter( state ) }, getResetPassword( state ) );
};

const ResetPasswordContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( ResetPasswordPage );

export default ResetPasswordContainer;
