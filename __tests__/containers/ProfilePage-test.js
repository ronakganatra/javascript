import React from "react";
import { mapStateToProps, mapDispatchToProps } from "../../src/containers/ProfilePage"
import { profileUpdateEmail } from "../../src/actions/user";
import { url } from "gravatar";
let avatarPlaceholder = "https://s3.amazonaws.com/yoast-my-yoast/default-avatar.png";

test('the mapStateToProps function', () => {
	let state = {
		user: {
			data: {
				profile: {
					email: "test@test.test"
				},
			},
			email: "test@test.test",
			saveEmailError: "An error",
			savingProfile: false,
			deletingProfile: false,
			sendingPasswordReset: false,
			sendPasswordReset: false,
			passwordResetError: "Password reset error",
		},
	};

	let expected = {
		email: "test@test.test",
		image: url( state.user.data.profile.email, {
			s: "150",
			r: "pg",
			d: avatarPlaceholder,
			protocol: "https",
		} ),
		saveEmailError: "An error",

		isSaving: false,
		isDeleting: false,
		isSendingPasswordReset: false,
		hasSendPasswordReset: false,
		passwordResetError: "Password reset error",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );
} );

test('the mapDispatchToProps function to call profileUpdateEmail action with onChangeEmail when confirm is true', () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps( dispatch );

	props.onUpdateEmail( "test@test.test" );

	expect( dispatch ).toHaveBeenCalledWith( profileUpdateEmail( "test@test.test" ) );
} );
