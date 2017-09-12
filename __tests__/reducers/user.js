import userReducer, {
	userEmailReducer,
	passwordResetReducer,
	userDisableReducer,
} from "../../src/reducers/user";
import {
	login,
	LOGIN,
	LOGOUT,
	FETCH_USER_FAILURE,
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	PROFILE_UPDATE_EMAIL,
	PROFILE_UPDATE_REQUEST,
	PROFILE_UPDATE_SUCCESS,
	PROFILE_UPDATE_FAILURE,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAILURE,
	DISABLE_USER_START,
	DISABLE_USER_SUCCESS,
	DISABLE_USER_FAILURE,
} from "../../src/actions/user";

test( 'the login action', () => {
	const input = {};
	const action = {
		type: LOGIN,
		data: {
			userId: 5,
			accessToken: "A token",
		}
	};
	const expected = {
		loggedIn: true,
		userId: 5,
		accessToken: "A token",
	};

	const actual = userReducer( input, action );

	expect( actual ).toEqual( expected );
} );

test( 'the logout action', () => {
	const input = {
		loggedIn: true,
		userId: 5,
		accessToken: "A token",
	};
	const action = {
		type: LOGOUT,
	};
	const expected = {
		loggedIn: false,
		accessToken: "",
		userId: null,
	};

	const actual = userReducer( input, action );

	expect( actual ).toEqual( expected );
} );

test( 'the fetch user request action', () => {
	const input = {};
	const action = {
		type: FETCH_USER_REQUEST,
	};
	const expected = {
		isFetching: true,
	};

	const actual = userReducer( input, action );

	expect( actual ).toEqual( expected );
} );

test( 'the fetch user request success action', () => {
	const input = {
		isFetching: true,
	};
	const action = {
		type: FETCH_USER_SUCCESS,
		user: {
			someData: "data",
			profile: {
				email: "an email",
			},
		}
	};
	const expected = {
		isFetching: false,
		data: {
			someData: "data",
			profile: {
				email: "an email",
			},
		},
		email: "an email",
	};

	const actual = userReducer( input, action );

	expect( actual ).toEqual( expected );
} );

test( 'the disable user start action', () => {
	const input = {};
	const action = {
		type: DISABLE_USER_START,
	};
	const expected = {
		deletingProfile: true,
	};

	const actual = userDisableReducer( input, action );

	expect( actual ).toEqual( expected );
} );

test( 'the disable user success action', () => {
	const input = {};
	const action = {
		type: DISABLE_USER_SUCCESS,
	};
	const expected = {
		deletingProfile: false,
		enabled: false,
	};

	const actual = userDisableReducer( input, action );

	expect( actual ).toEqual( expected );
} );

test( 'the disable user failure action', () => {
	const input = {};
	const action = {
		type: DISABLE_USER_FAILURE,
		error: { error: "A disable user failure error." },
	};
	const expected = {
		deletingProfile: false,
		deleteProfileError: { error: "A disable user failure error." },
	};

	const actual = userDisableReducer( input, action );

	expect( actual ).toEqual( expected );
} );

describe( 'userEmailReducer', () => {
	test( 'update request', () => {
		const input = {
			sendPasswordReset: false,
			savingProfile: false,
			saveEmailError: null,
			profileSaved: false,
		};
		const action = {
			type: PROFILE_UPDATE_REQUEST,
		};
		const expected = {
			sendPasswordReset: false,
			savingProfile: true,
			profileSaved: false,
			saveEmailError: null,
		};

		const actual = userEmailReducer( input, action );

		expect( actual ).toEqual( expected );
	} );

	test( 'update success', () => {
		const profile = {
			email: "email.email.email",
		};
		const input = {
			savingProfile: true,
			saveEmailError: null,
			profileSaved: true,
		};
		const action = {
			type: PROFILE_UPDATE_SUCCESS,
			profile: profile,
		};
		const expected = {
			savingProfile: false,
			saveEmailError: null,
			profileSaved: true,
			sendPasswordReset: false,
			data: {
				profile: profile,
			},
		};

		const actual = userEmailReducer( input, action );

		expect( actual ).toEqual( expected );
	} );

	test( 'update failure', () => {
		const input = {
			savingProfile: true,
			saveEmailError: null,
		};
		const action = {
			type: PROFILE_UPDATE_FAILURE,
			error: { error: "An profile update failure error." },
		};
		const expected = {
			savingProfile: false,
			profileSaved: false,
			saveEmailError: { error: "An profile update failure error." },
		};

		const actual = userEmailReducer( input, action );

		expect( actual ).toEqual( expected );
	} );

	test( 'change email', () => {
		const input = {
			email: "previous email",
			profileSaved: false,
		};
		const action = {
			type: PROFILE_UPDATE_EMAIL,
			email: "new email",
		};
		const expected = {
			email: "new email",
			profileSaved: false,
		};

		const actual = userEmailReducer( input, action );

		expect( actual ).toEqual( expected );
	} );
} );

describe( 'passwordResetReducer', () => {
	test( "reset request", () => {
		const input = {
			sendingPasswordReset: false,
			sendPasswordReset: false,
			passwordResetError: { error: "Some other error." },
		};
		const action = {
			type: RESET_PASSWORD_REQUEST,
		};
		const expected = {
			sendingPasswordReset: true,
			sendPasswordReset: false,
			passwordResetError: null,
		};

		const actual = passwordResetReducer( input, action );

		expect( actual ).toEqual( expected );
	} );

	test( 'reset success', () => {
		const input = {
			sendingPasswordReset: true,
			sendPasswordReset: false,
		};
		const action = {
			type: RESET_PASSWORD_SUCCESS,
		};
		const expected = {
			sendingPasswordReset: false,
			sendPasswordReset: true,
		};

		const actual = passwordResetReducer( input, action );

		expect( actual ).toEqual( expected );
	} );

	test( 'reset failure', () => {
		const input = {
			sendingPasswordReset: true,
			sendPasswordReset: false,
			passwordResetError: null,
		};
		const action = {
			type: RESET_PASSWORD_FAILURE,
			error: { error: "A password reset failure error." },
		};
		const expected = {
			sendingPasswordReset: false,
			sendPasswordReset: false,
			passwordResetError: { error: "A password reset failure error." },
		};

		const actual = passwordResetReducer( input, action );

		expect( actual ).toEqual( expected );
	} );
} );
