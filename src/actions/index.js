import "whatwg-fetch";

/*
 * Action types
 */
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

/**
 * Action creators
 */
export function login( accessToken, userId ) {
	return {
		type: LOGIN,
		data: {
			accessToken,
			userId
		}
	};
}

export function logout() {
	return {
		type: LOGOUT,
	};
}

export function requestUser() {
	return {
		type: FETCH_USER_REQUEST
	};
}

export function receiveUser(user) {
	return {
		type: FETCH_USER_SUCCESS,
		user: user
	}
}

export function fetchUser( accessToken, userId ) {
	return ( dispatch ) => {
		dispatch( requestUser() );

		return fetch(`http://localhost:3000/api/MyYoastUsers/${userId}?access_token=${accessToken}` )
			.then( response => response.json() )
			.then( json => dispatch( receiveUser( json ) ) );
	};
}
