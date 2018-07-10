import React from "react";
import { mapStateToProps } from "../../src/containers/ProfilePage";

test( 'the mapStateToProps function', () => {
	let state = {
		user: {
			data: {
				profile: {
					email: "test@test.test",
					userFirstName: "firstName",
					userLastName: "lastName",
					userAvatarUrl: "https://example.com/test.png",
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
		image: "https://example.com/test.png",
		userFirstName: "firstName",
		userLastName: "lastName",
		saveEmailError: "An error",
		isSaved: false,
		isSaving: false,
		isDeleting: false,
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
