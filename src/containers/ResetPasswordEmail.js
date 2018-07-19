import { connect } from "react-redux";
import ResetPasswordEmailPage from "../components/login/ResetPasswordEmailPage";
import { doRequest, prepareInternalRequest } from "../functions/api";

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		attemptResetPasswordEmail: ( data ) => {
			let params = data;
			let request = prepareInternalRequest( "Customers/sendResetPasswordEmail/", "POST", params );
			doRequest( request )
			.then( () => {
				ownProps.history.push( "/reset/emailSuccess" );
			} )
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
