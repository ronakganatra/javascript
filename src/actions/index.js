/*
 * Action types
 */
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

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
