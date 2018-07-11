import { connect } from "react-redux";
import ResetPasswordPage from "../components/login/ResetPasswordPage";
import { doRequest, prepareInternalRequest } from "../functions/api";

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		attemptResetPassword: ( data ) => {
			 let params = data;
			 let request = prepareInternalRequest( "Customers/resetPassword/", "PATCH", params );
			 doRequest( request )
			 .then( () => {
			 console.log( "succceeded!" );
			 }
			 )
			 .catch( ( error ) => {
				return error;
			 } );
		},
	};
};

const ResetPasswordContainer = connect(
	mapDispatchToProps
)( ResetPasswordPage );

export default ResetPasswordContainer;
