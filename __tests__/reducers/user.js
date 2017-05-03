import { userEmailReducer, userReducer } from "../../src/reducers/user";
import { login, PROFILE_UPDATE_EMAIL, LOGIN, LOGOUT, FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "../../src/actions/user";

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
		}
	};
	const expected = {
		isFetching: false,
		data: {
			someData: "data",
		},
	};

	const actual = userReducer( input, action );

	expect( actual ).toEqual( expected );
} );


test( 'the update email address action', () => {
	const input = {
		data: {
			profile: {email: "updated emailaddress" }
		}
	};
	const action = {
		type: PROFILE_UPDATE_EMAIL,
	};
	const expected = {
		data: {	profile: { email: "updated emailaddress" }
		},
	};

	const actual = userEmailReducer( input, action );

	expect( actual ).toEqual( expected );
} );
