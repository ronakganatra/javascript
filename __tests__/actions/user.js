import * as actions from "../../src/actions/user";
import * as api from "../../src/functions/api";
import { getPasswordResetUrl } from "../../src/functions/auth";

jest.mock( "whatwg-fetch" );

jest.mock( "../../src/functions/api", () => {
	return {
		getApiUrl: jest.fn( () => { return "" } ),
		prepareRequest: jest.fn( ( endpoint, method = "GET", payload = {} ) => {
			return { endpoint, method, payload };
		} ),
		prepareInternalRequest: jest.fn( ( endpoint, method = "GET", payload = {} ) => {
			return { endpoint, method, payload };
		} ),
		doRequest: jest.fn( ( request ) => {
			if ( request.method === "GET" ) {
				return Promise.resolve( { username: "foo" } );
			}

			if ( request.method === "PATCH" ) {
				return Promise.resolve( request.payload );
			}

			return Promise.resolve( { status: 200 } );
		} )
	};
} );

jest.mock( "../../src/functions/auth", () => {
	return {
		getUserId: jest.fn( () => { return 10 } ),
		getAccessToken: jest.fn( () => { return "access" } ),
		getPasswordResetUrl: jest.fn( () => { return "http://reset.your.passwo.rd" } ),
		getLogoutUrl: jest.fn( () => { return "http://log.out" } ),
		removeCookies: jest.fn( () => {} ),
	}
} );

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

	const input = { userData: "data" };
	const actual = actions.receiveUser( input );

	expect( actual ).toEqual( expected );
} );

test( 'fetch user action creator', () => {
	const dispatch = jest.fn();
	const fetchUserFunc = actions.fetchUser( 10 );

	let request = api.prepareInternalRequest( "Customers/10/profile/" );

	expect( fetchUserFunc ).toBeInstanceOf( Function );

	return fetchUserFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.requestUser() );
		expect( api.prepareInternalRequest ).toHaveBeenCalled();
		expect( api.doRequest ).toHaveBeenCalledWith( request );
		expect( dispatch ).toHaveBeenCalledWith( actions.receiveUser( { username: "foo" } ) );
	} );
} );

test( 'disable user start action creator', () => {
	const expected = {
		type: actions.DISABLE_USER_START,
	};

	const actual = actions.disableUserStart();

	expect( actual ).toEqual( expected );
} );

test( 'disable user success action creator', () => {
	const expected = {
		type: actions.DISABLE_USER_SUCCESS,
	};

	const actual = actions.disableUserSuccess();

	expect( actual ).toEqual( expected );
} );

test( 'disable user failure action creator', () => {
	const expected = {
		type: actions.DISABLE_USER_FAILURE,
		errorMessage: "Fail",
	};

	const actual = actions.disableUserFailure( "Fail" );

	expect( actual ).toEqual( expected );
} );

test( 'disable user action creator', () => {
	let request = api.prepareInternalRequest( "Customers/10/", "PATCH", { enabled: false } );

	const dispatch = jest.fn();
	const disableUserFunc = actions.disableUser();

	expect( disableUserFunc ).toBeInstanceOf( Function );

	return disableUserFunc( dispatch ).then( () => {
		expect( dispatch ).toHaveBeenCalledWith( actions.disableUserSuccess() );
		expect( api.prepareInternalRequest ).toHaveBeenCalled();
		expect( api.doRequest ).toHaveBeenCalledWith( request );
	} );
} );

describe( 'Password reset', () => {
	test( 'request action', () => {
		const expected = {
			type: actions.RESET_PASSWORD_REQUEST,
		};

		const actual = actions.passwordResetRequest();

		expect( actual ).toEqual( expected );
	} );

	test( 'failure action', () => {
		const expected = {
			type: actions.RESET_PASSWORD_FAILURE,
			message: "message",
		};

		const actual = actions.passwordResetFailure( "message" );

		expect( actual ).toEqual( expected );
	} );

	test( 'success action', () => {
		const expected = {
			type: actions.RESET_PASSWORD_SUCCESS,
		};

		const actual = actions.passwordResetSuccess();

		expect( actual ).toEqual( expected );
	} );

	test( 'actual reset', () => {
		const dispatch = jest.fn();
		const resetPasswordFunc = actions.passwordResetSend( "email@email.email" );

		const expectedBody = new FormData();
		expectedBody.append( "user_login", "email@email.email" );

		const request = api.prepareRequest(
			getPasswordResetUrl(),
			"POST",
			{ body: expectedBody },
			{ mode: "no-cors" } );

		expect( resetPasswordFunc ).toBeInstanceOf( Function );

		return resetPasswordFunc( dispatch ).then( () => {
			expect( dispatch ).toHaveBeenCalledWith( actions.passwordResetRequest() );
			expect( api.prepareRequest ).toHaveBeenCalled();
			expect( api.doRequest ).toHaveBeenCalledWith( request );
			expect( dispatch ).toHaveBeenCalledWith( actions.passwordResetSuccess() );
		} );
	} );
} );

describe( 'Profile saving', () => {
	test( 'request action', () => {
		const expected = {
			type: actions.PROFILE_UPDATE_REQUEST,
		};

		const actual = actions.profileUpdateRequest();

		expect( actual ).toEqual( expected );
	} );

	test( 'failure action', () => {
		const expected = {
			type: actions.PROFILE_UPDATE_FAILURE,
			message: "message",
		};

		const actual = actions.profileUpdateFailure( "message" );

		expect( actual ).toEqual( expected );
	} );

	test( 'success action', () => {
		const expected = {
			type: actions.PROFILE_UPDATE_SUCCESS,
		};

		const actual = actions.profileUpdateSuccess();

		expect( actual ).toEqual( expected );
	} );

	test( 'actual profile save', () => {
		const dispatch = jest.fn();

		let request = api.prepareInternalRequest( "Customers/10/profile/", "PATCH", { email: "email@email.email" } );

		const saveProfileFunc = actions.updateProfile( { email: "email@email.email" } );

		expect( saveProfileFunc ).toBeInstanceOf( Function );

		return saveProfileFunc( dispatch ).then( () => {
			expect( dispatch ).toHaveBeenCalledWith( actions.profileUpdateRequest() );
			expect( api.prepareInternalRequest ).toHaveBeenCalled();
			expect( api.doRequest ).toHaveBeenCalledWith( request );
			expect( dispatch ).toHaveBeenCalledWith( actions.profileUpdateSuccess( { email: "email@email.email" } ) );
		} );
	} );

	test( 'failed profile save', () => {
		// Force a rejection to ensure the profileUpdateFailure will be called.
		api.doRequest.mockImplementation( () => {
			return Promise.reject( Error( "An error occurred" ) );
		} );

		const dispatch = jest.fn();
		let request = api.prepareInternalRequest( "Customers/10/profile/", "PATCH", { email: "email@email.email" } );
		const resetPasswordFunc = actions.updateProfile( { email: "email@email.email" } );

		return resetPasswordFunc( dispatch ).then( () => {
			expect( dispatch ).toHaveBeenCalledWith( actions.profileUpdateRequest() );
			expect( api.prepareInternalRequest ).toHaveBeenCalled();
			expect( api.doRequest ).toHaveBeenCalledWith( request );
			expect( dispatch ).toHaveBeenCalledWith( actions.profileUpdateFailure( "An error occurred" ) );

		} );
	} );
} );
