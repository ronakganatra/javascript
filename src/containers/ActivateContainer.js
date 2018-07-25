import { connect } from "react-redux";
import Activate from "../components/login/Activate";
import { doRequest, prepareInternalRequest } from "../functions/api";
import { activateRequest, activateFailure, activateSuccess } from "../actions/signup";

export const mapStateToProps = ( state, ownProps ) => {
	return Object.assign( {}, state.ui.login );
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		activateUser: ( data ) => {
			dispatch( activateRequest( data ) );
			let request = prepareInternalRequest( "Customers/activate/", "POST", data );
			doRequest( request )
				.then( ( response ) => {
					dispatch( activateSuccess() );
				} )
				.catch( ( error ) => {
					dispatch( activateFailure( error ) );
					return error;
				} );
		},
	};
};

const ActivateContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( Activate );

export default ActivateContainer;
