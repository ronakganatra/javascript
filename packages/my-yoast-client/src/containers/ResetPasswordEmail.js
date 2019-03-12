import { connect } from "react-redux";
import ResetPasswordEmailPage from "../components/login/ResetPasswordEmailPage";
import { sendResetPasswordEmailRequest } from "../actions/resetPassword";
import { getResetPassword } from "../selectors/ui/login";

/* eslint-disable require-jsdoc */
export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		attemptResetPasswordEmail: ( data ) => {
			dispatch( sendResetPasswordEmailRequest( data, ownProps ) );
		},
	};
};

export const mapStateToProps = ( state ) => {
	return getResetPassword( state );
};

const ResetPasswordContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( ResetPasswordEmailPage );

export default ResetPasswordContainer;
