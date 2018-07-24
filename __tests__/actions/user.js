import * as actions from "../../src/actions/user";
import * as api from "../../src/functions/api";
import { getPasswordResetUrl } from "../../src/functions/auth";

global.document = {
	location: {
		href: ""
	}
};

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
		hasCookieParams: jest.fn( () => false ),
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
		error: { error: "A disable user failure error" },
	};

	const actual = actions.disableUserFailure( { error: "A disable user failure error" } );

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
			type: actions.PASSWORD_UPDATE_REQUEST,
		};

		const actual = actions.passwordUpdateRequest();

		expect( actual ).toEqual( expected );
	} );

	test( 'failure action', () => {
		const expected = {
			type: actions.PASSWORD_UPDATE_FAILURE,
			error: { error: "A reset password failure error" },
		};

		const actual = actions.passwordUpdateFailure( { error: "A reset password failure error" } );

		expect( actual ).toEqual( expected );
	} );

	test( 'success action', () => {
		const expected = {
			type: actions.PASSWORD_UPDATE_SUCCESS,
		};

		const actual = actions.passwordUpdateSuccess();

		expect( actual ).toEqual( expected );
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
			error: { error: "A profile update failure error" },
		};

		const actual = actions.profileUpdateFailure( { error: "A profile update failure error" } );

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
		let error = { error: "errorMessage" };
		// Force a rejection to ensure the profileUpdateFailure will be called.
		api.doRequest.mockImplementation( () => {
			return Promise.reject(  error );
		} );

		const dispatch = jest.fn();
		let request = api.prepareInternalRequest( "Customers/10/profile/", "PATCH", { email: "email@email.email" } );
		const resetPasswordFunc = actions.updateProfile( { email: "email@email.email" } );

		return resetPasswordFunc( dispatch ).then( () => {
			expect( dispatch ).toHaveBeenCalledWith( actions.profileUpdateRequest() );
			expect( api.prepareInternalRequest ).toHaveBeenCalled();
			expect( api.doRequest ).toHaveBeenCalledWith( request );
			expect( dispatch ).toHaveBeenCalledWith( actions.profileUpdateFailure( error ) );

		} );
	} );
} );
