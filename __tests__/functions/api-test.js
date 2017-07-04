import * as api from '../../src/functions/api.js';

const removeAuthCookies = jest.fn();

let responseAuthFail = {
	status: 401,
}

test( "The handle401 function with a 401 error", () => {
	expect( api.handle401( responseAuthFail ) ).toThrowError
} );
