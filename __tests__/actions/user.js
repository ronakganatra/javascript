import * as actions from "../../src/actions/user";
import { getApiUrl } from "../../src/functions/api";

jest.mock( "whatwg-fetch" );

test( 'login action creator', () => {
	const expected = {
		type: actions.LOGIN,
		data: {
			accessToken: "Access Token",
			userId: 5
		},
	};

	const actual = actions.login( "Access Token", 5 );

	expect( actual ).toEqual( expected );
} );

test( 'logout action creator', () => {
	const expected = {
		type: actions.LOGOUT,
	};

	const actual = actions.logout();

	expect( actual ).toEqual( expected );
} );

test( 'request user action creator', () => {
	const expected = {
		type: actions.FETCH_USER_REQUEST,
	};

	const actual = actions.requestUser();

	expect( actual ).toEqual( expected );
} );


test( 'request user action creator', () => {
	const expected = {
		type: actions.FETCH_USER_SUCCESS,
		user: {
			userData: "data",
		},
	};
	const input = {
		userData: "data",
	};

	const actual = actions.receiveUser( input );

	expect( actual ).toEqual( expected );
} );

test( 'fetch user action creator', () => {
	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			json: () => { return "User data" },
		} );
	});

	const dispatch = jest.fn();

	const fetchUserFunc = actions.fetchUser( "AccessToken", 5 );

	expect( fetchUserFunc ).toBeInstanceOf( Function );

	return fetchUserFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.requestUser() );
		expect( global.fetch ).toHaveBeenCalledWith( getApiUrl() + "/Customers/5/profile?access_token=AccessToken" );
		expect( dispatch ).toHaveBeenCalledWith( actions.receiveUser( "User data" ) );
	} );
} );
