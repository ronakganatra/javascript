import userReducer, {
	userEmailReducer,
	passwordResetReducer,
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

describe( 'userEmailReducer', () => {
	test( 'update request', () => {
		const input = {
			savingProfile: false,
			savingError: "An error",
		};
		const action = {
			type: PROFILE_UPDATE_REQUEST,
		};
		const expected = {
			savingProfile: true,
			savingError: "",
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
			savingError: "",
		};
		const action = {
			type: PROFILE_UPDATE_SUCCESS,
			profile: profile,
		};
		const expected = {
			savingProfile: false,
			savingError: "",
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
			savingError: "",
		};
		const action = {
			type: PROFILE_UPDATE_FAILURE,
			message: "An error",
		};
		const expected = {
			savingProfile: false,
			savingError: "An error",
		};

		const actual = userEmailReducer( input, action );

		expect( actual ).toEqual( expected );
	} );

	test( 'change email', () => {
		const input = {
			email: "previous email",
		};
		const action = {
			type: PROFILE_UPDATE_EMAIL,
			email: "new email",
		};
		const expected = {
			email: "new email",
		};

		const actual = userEmailReducer( input, action );

		expect( actual ).toEqual( expected );
	} );
} );

describe( 'passwordResetReducer', () => {
	test( "reset request", () => {
		const input = {
			sendingPasswordReset: false,
			passwordResetError: "Some error",
		};
		const action = {
			type: RESET_PASSWORD_REQUEST,
		};
		const expected = {
			sendingPasswordReset: true,
			passwordResetError: "",
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
			passwordResetError: "",
		};
		const action = {
			type: RESET_PASSWORD_FAILURE,
			message: "An error",
		};
		const expected = {
			sendingPasswordReset: false,
			sendPasswordReset: false,
			passwordResetError: "An error",
		};

		const actual = passwordResetReducer( input, action );

		expect( actual ).toEqual( expected );
	} );
} );
