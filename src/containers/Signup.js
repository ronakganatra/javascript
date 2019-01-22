import { connect } from "react-redux";
import Signup from "../components/login/Signup";
import { signupRequest } from "../actions/signup";
import { getRouter } from "../selectors/router/router";
import { getSignupError, getSignupRequestSuccess } from "../selectors/ui/signup";

/* eslint-disable require-jsdoc */
export const mapDispatchToProps = ( dispatch ) => {
	return {
		attemptSignup: ( data ) => {
			dispatch( signupRequest( data ) );
		},
	};
};

export const mapStateToProps = ( state ) => {
	return {
		stateRouter: getRouter( state ),
		signupError: getSignupError( state ),
		signupRequestSuccess: getSignupRequestSuccess( state ),
	};
};

const SignupContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( Signup );

export default SignupContainer;

