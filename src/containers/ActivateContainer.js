import { connect } from "react-redux";
import Activate from "../components/login/Activate";
import { activateRequest } from "../actions/signup";

export const mapStateToProps = ( state, ownProps ) => {
	return Object.assign( {}, state.user, state.ui.activate );
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		activateUser: ( data ) => {
			dispatch( activateRequest( data ) );
		},
	};
};

const ActivateContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( Activate );

export default ActivateContainer;
