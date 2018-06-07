import React from "react";
import { mapStateToProps, mapDispatchToProps } from "../../src/containers/ProfilePage"
import { url } from "gravatar";

let avatarPlaceholder = "https://s3.amazonaws.com/yoast-my-yoast/default-avatar.png";

test( 'the mapStateToProps function', () => {
	let state = {
		user: {
			data: {
				profile: {
					email: "test@test.test",
					userFirstName: "firstName",
					userLastName: "lastName",
				},
			},
			saveEmailError: "An error",
			savingProfile: false,
			profileSaved: false,
			deletingProfile: false,
			sendingPasswordReset: false,
			sendPasswordReset: false,
			passwordResetError: "Password reset error",
		},
		entities: {
			composerTokens: {
				byId: {},
				allIds: [],
			}
		},
		ui: {
			composerTokens: {
				createTokenModalIsOpen: false,
				manageTokenModalIsOpen: false,
				manageTokenData: null,
			},
			newsletter: {
				subscribed: "subscribed",
				error: "",
				loading: false,
			}
		},
	};

	let expected = {
		email: "test@test.test",
		composerTokens: [],
		image: avatarPlaceholder,
		userFirstName: "firstName",
		userLastName: "lastName",
		saveEmailError: "An error",
		isSaved: false,
		isSaving: false,
		isDeleting: false,
		isSendingPasswordReset: false,
		hasSendPasswordReset: false,
		isSavingPassword: false,
		passwordIsSaved: false,
		passwordResetError: "Password reset error",
		manageTokenData: null,
		createTokenModalIsOpen: false,
		manageTokenModalIsOpen: false,
		tokenError: undefined,
		newsletterError: "",
		newsletterLoading: false,
		newsletterSubscribed: "subscribed",
	};

	expect( mapStateToProps( state ) ).toEqual( expected );
} );
