import * as actions from "../../src/actions/products";
import { getApiUrl } from "../../src/functions/api";

jest.mock( "whatwg-fetch" );

jest.mock( "../../src/functions/auth", () => {
	return {
		getUserId: jest.fn( () => { return 2 } ),
		getAccessToken: jest.fn( () => { return "access" } ),
	}
} );

let expectedRequest = new Request( getApiUrl() + "/products/?access_token=access", {
	method: "GET",
	body: JSON.stringify(),
	headers: {
		"Content-Type": "application/json",
	},
} );

test( 'get all products action creator with success', () => {
	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			status: 200,
			json: () => { return {
				test: "test",
			} },
		} );
	});

	const dispatch = jest.fn();

	const getAllProductsFunc = actions.getAllProducts();

	expect( getAllProductsFunc ).toBeInstanceOf( Function );

	let product = {
		test: "test",
	};

	return getAllProductsFunc( dispatch ).then( () => {
		expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
		expect( dispatch ).toHaveBeenCalledWith( actions.getAllProductsSuccess( product ) );
	} );
} );


test( 'get all products action creator with failure', () => {
	global.fetch = jest.fn( () => {
		return Promise.resolve( {
			json: () => { return {
				"error": {
					"message": "error message test",
				}
			} },
		} );
	});

	const dispatch = jest.fn();

	const getAllProductsFunc = actions.getAllProducts();

	expect( getAllProductsFunc ).toBeInstanceOf( Function );

	return getAllProductsFunc( dispatch ).then( () => {
		expect( global.fetch ).toHaveBeenCalledWith( expectedRequest );
		expect( dispatch ).toHaveBeenCalledWith( actions.getAllProductsFailure( "error message test" ) );
	} );
} );
