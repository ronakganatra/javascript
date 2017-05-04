import { connect } from "react-redux";
import ProfilePage from "../components/ProfilePage";
import { profileUpdateEmail } from "../actions/user";

const mapStateToProps = ( state ) => {
	return {
		email: state.user.data.profile.email,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		onChange: ( email ) => {
			dispatch( profileUpdateEmail( email ) );
		},
	};
};

export const mergeProps = ( stateProps, dispatchProps, ownProps ) => {
	let email = stateProps.email;

	let onUpdateEmail = () => {
		dispatchProps.onUpdateEmail( email );
	};

	return Object.assign( {}, ownProps, stateProps, dispatchProps, { onUpdateEmail } );
};


const ProfilePageContainer = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)( ProfilePage );

export default ProfilePageContainer;
