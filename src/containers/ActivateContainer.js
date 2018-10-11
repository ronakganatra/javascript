import { connect } from "react-redux";
import Activate from "../components/login/Activate";
import { activateRequest } from "../actions/signup";
import { resetOauthError } from "../actions/login";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	return Object.assign( {}, state.user, state.ui.activate );
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		activateUser: ( data ) => {
			dispatch( activateRequest( data ) );
		},
		resetOauthError: () => {
			dispatch( resetOauthError() );
		},
	};
};

const ActivateContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( Activate );

export default ActivateContainer;
