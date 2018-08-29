import { connect } from "react-redux";
import Signup from "../components/login/Signup";
import { signupRequest } from "../actions/signup";

export const mapDispatchToProps = ( dispatch ) => {
	return {
		attemptSignup: ( data ) => {
			dispatch( signupRequest( data ) );
		},
	};
};

export const mapStateToProps = ( state ) => {
	return Object.assign( {}, {
		stateRouter: state.router,
		signupError: state.ui.signup.error,
		signupRequestSuccess: state.ui.signup.signupRequestSuccess,
	} );
};

const SignupContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( Signup );

export default SignupContainer;

