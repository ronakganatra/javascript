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
		global.fetch = jest.fn( () => {
			return Promise.resolve( {
				status: 200,
				json: () => { return "Yay" },
			} );
		});

		const dispatch = jest.fn();

		const expectedBody = new FormData();
		expectedBody.append( "user_login", "email@email.email" );

		const expectedRequest = new Request(
			"http://yoast.dev/wp-login.php?action=lostpassword",
			{
				method: "POST",
				body: expectedBody,
				mode: "no-cors",
			}
		);

		const resetPasswordFunc = actions.passwordResetSend( "email@email.email" );

		expect( resetPasswordFunc ).toBeInstanceOf( Function );

		return resetPasswordFunc( dispatch ).then( () => {
			expect( dispatch ).toHaveBeenCalledWith( actions.passwordResetRequest() );
			expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
			expect( dispatch ).toHaveBeenCalledWith( actions.passwordResetSuccess() );
		} );
	} );

	test( 'failed reset', () => {
		global.fetch = jest.fn( () => {
			return Promise.resolve( {
				status: 404,
				json: () => {
					return {
						"error": {
							"statusCode": 404,
							"name": "Error",
							"message": "An error occurred",
							"code": "MODEL_NOT_FOUND",
							"stack": "Error: could not find a model with id 6"
						}
					}
				},
			} );
		});

		const dispatch = jest.fn();

		const resetPasswordFunc = actions.passwordResetSend( "email@email.email" );

		return resetPasswordFunc( dispatch ).then( () => {
			expect( dispatch ).toHaveBeenCalledWith( actions.passwordResetRequest() );
			expect( dispatch ).toHaveBeenCalledWith( actions.passwordResetFailure( "An error occurred" ) );

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
} );
