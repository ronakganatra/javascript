import { connect } from "react-redux";
import ProfilePage from "../components/ProfilePage";
import { profileUpdateEmail } from "../actions/user";
import { url } from "gravatar";
let avatarPlaceholder = "https://s3.amazonaws.com/yoast-my-yoast/My_Yoast_default_avatar.png";

const mapStateToProps = ( state ) => {
	return {
		email: state.user.data.profile.email,
		image: url( state.user.data.profile.email, {
			s: "150",
			r: "pg",
			d: avatarPlaceholder,
			protocol: "https",
		} ),
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
