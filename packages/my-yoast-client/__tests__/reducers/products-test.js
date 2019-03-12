import {
	uiSiteProductsReducer,
	uiAllProductsReducer,
	byIdProductsReducer,
	allIdsProductsReducer,
} from "../../src/reducers/products";
import {
	GET_ALL_PRODUCTS_REQUEST,
	GET_ALL_PRODUCTS_SUCCESS,
	GET_ALL_PRODUCTS_FAILURE,
} from "../../src/actions/products";

test( 'The uiAllProductsReducer processes the get all product request action', () => {
	const state = {
		requesting: false,
	};
	const action = {
		type: GET_ALL_PRODUCTS_REQUEST,
	};
	const expected = {
		requesting: true,
		error: "",
	};

	const actual = uiAllProductsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiAllProductsReducer processes the get all product success action', () => {
	const state = {
		requesting: true,
	};
	const action = {
		type: GET_ALL_PRODUCTS_SUCCESS,
	};
	const expected = {
		requesting: false,
	};

	const actual = uiAllProductsReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiAllProductsReducer processes the get all product failure action', () => {
	const state = {
		requesting: true,
	};
	const action = {
		type: GET_ALL_PRODUCTS_FAILURE,
		message: "test_errorMessage",
	};
	const expected = {
		requesting: false,
		error: "test_errorMessage",
	};

	const actual = uiAllProductsReducer( state, action );

	expect( actual ).toEqual( expected );
} );
