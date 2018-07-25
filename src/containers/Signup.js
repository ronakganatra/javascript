import { connect } from "react-redux";
import Signup from "../components/login/Signup";
import { signupRequest } from "../actions/signup";

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		attemptSignup: ( data ) => {
			dispatch( signupRequest( data ) );
		},
	};
};

export const mapStateToProps = ( state ) => {
	return {
		stateRouter: state.router,
		signupError: state.ui.signup.error,
		signupRequestSent: state.ui.signup.signupRequestSent,
	};
};

const SignupContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( Signup );

export default SignupContainer;

