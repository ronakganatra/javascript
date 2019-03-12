import * as actions from "../../src/actions/orders";

jest.mock( "whatwg-fetch" );

test( 'get request action creator', () => {
	const expected = {
		type: actions.GET_ORDERS_REQUEST,
	};
	const actual = actions.getOrdersRequest( );
	expect( actual ).toEqual( expected );
} );

test( 'get success action creator', () => {
	const expected = {
		type: actions.GET_ORDERS_SUCCESS,
	};
	const actual = actions.getOrdersSuccess();
	expect( actual ).toEqual( expected );
} );

test( 'get failure action creator', () => {
	const expected = {
		type: actions.GET_ORDERS_FAILURE,
	};
	const actual = actions.getOrdersFailure();
	expect( actual ).toEqual( expected );
} );
