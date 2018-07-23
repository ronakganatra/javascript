import { connect } from "react-redux";
import Activate from "../components/login/Activate";

export const mapStateToProps = ( state, ownProps ) => {
	return Object.assign( {}, state.ui.login );
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		activateUser: ( params ) => {
			dispatch( activateRequest( params ) );
		},
	};
};

const ActivateContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( Activate );

export default ActivateContainer;
