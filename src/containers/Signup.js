import { connect } from "react-redux";
import Signup from "../components/login/Signup";
import { doRequest, prepareInternalRequest } from "../functions/api";

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		attemptSignup: ( data ) => {
			console.log( "data in container:", data );
			let params = data;
			let request = prepareInternalRequest( "Customers/signup/", "POST", params );
			doRequest( request )
				.then( () => {
					console.log( "signup succeeded!" );
				}
				)
				.catch( ( error ) => {
					return error;
				} );
		},
	};
};

export const mapStateToProps = ( state ) => {
	return {
		stateRouter: state.router,
	};
};

const SignupContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( Signup );

export default SignupContainer;
