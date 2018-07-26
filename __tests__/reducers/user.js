import userReducer, {
	userEmailReducer,
	passwordResetReducer,
	userDisableReducer,
} from "../../src/reducers/user";
import {
	LOGIN,
	FETCH_USER_FAILURE,
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	PROFILE_UPDATE_REQUEST,
	PROFILE_UPDATE_SUCCESS,
	PROFILE_UPDATE_FAILURE,
	PASSWORD_UPDATE_REQUEST,
	PASSWORD_UPDATE_SUCCESS,
	PASSWORD_UPDATE_FAILURE,
	DISABLE_USER_START,
	DISABLE_USER_SUCCESS,
	DISABLE_USER_FAILURE,
	LOGOUT_SUCCESS,
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

test( 'the logoutSuccess action', () => {
	const input = {
		loggedIn: true,
		userId: 5,
		accessToken: "A token",
	};
	const action = {
		type: LOGOUT_SUCCESS,
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
			pendingRequests: [],
		};
		const action = {
			type: PROFILE_UPDATE_REQUEST,
		};
		const expected = {
			sendPasswordReset: false,
			savingProfile: true,
			profileSaved: false,
			saveEmailError: null,
			pendingRequests: [ "default" ],
		};

		const actual = userEmailReducer( input, action );

		expect( actual ).toEqual( expected );
	} );

	test( 'update success', () => {
		const input = {
			savingProfile: true,
			saveEmailError: null,
			profileSaved: true,
			data: {
				profile: {
					email: "email.email.email",
					userFirstName: "testFirst",
					userLastName: "testLast",
				}
			},
			pendingRequests: [ "default" ],
		};
		const action = {
			type: PROFILE_UPDATE_SUCCESS,
			profile: {
				userEmail: "new.email",
				userFirstName: "newFirst",
				userLastName: "newLast",
			}
		};
		const expected = {
			savingProfile: false,
			saveEmailError: null,
			profileSaved: true,
			sendPasswordReset: false,
			data: {
				profile: {
					email: "new.email",
					userFirstName: "newFirst",
					userLastName: "newLast",
				}
			},
			pendingRequests: [],
		};

		const actual = userEmailReducer( input, action );

		expect( actual ).toEqual( expected );
	} );

	test( 'update failure', () => {
		const input = {
			savingProfile: true,
			saveEmailError: null,
			pendingRequests: [ "testRequest" ]
		};
		const action = {
			type: PROFILE_UPDATE_FAILURE,
			error: { error: "A profile update failure error." },
			subtype: "testRequest",
		};
		const expected = {
			savingProfile: false,
			profileSaved: false,
			saveEmailError: { error: "A profile update failure error." },
			pendingRequests: [],
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
			type: PASSWORD_UPDATE_REQUEST,
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
			passwordResetError: null,
			sendPasswordReset: false,
			sendingPasswordReset: true,
		};
		const action = {
			type: PASSWORD_UPDATE_SUCCESS,
		};
		const expected = {
			passwordResetError: null,
			sendPasswordReset: true,
			sendingPasswordReset: false,
		};

		const actual = passwordResetReducer( input, action );

		expect( actual ).toEqual( expected );
	} );

	test( 'reset failure', () => {
		const input = {
			passwordResetError: null,
			sendPasswordReset: false,
			sendingPasswordReset: true,
		};
		const action = {
			type: PASSWORD_UPDATE_FAILURE,
			error: { error: "A password reset failure error." },
		};
		const expected = {
			passwordResetError: { error: "A password reset failure error." },
			sendPasswordReset: false,
			sendingPasswordReset: false,
		};

		const actual = passwordResetReducer( input, action );

		expect( actual ).toEqual( expected );
	} );
} );
