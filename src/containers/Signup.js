import { connect } from "react-redux";
import Signup from "../components/login/Signup";
import { doRequest, prepareInternalRequest } from "../functions/api";

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		attemptSignup: ( data ) => {
			let params = data;
			let request = prepareInternalRequest( "Customers/signup/", "POST", params );
			doRequest( request )
				.then( () => {
					ownProps.history.push( "/almost-there" );
				} )
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
