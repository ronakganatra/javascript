import { connect } from "react-redux";
import Activate from "../components/login/Activate";
import { activateRequest } from "../actions/signup";
import { resetOauthError } from "../actions/login";
import { getUser } from "../selectors/entities/user";
import { getActivate } from "../selectors/ui/site";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	Object.assign( {}, getUser( state ), getActivate( state ) );
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
