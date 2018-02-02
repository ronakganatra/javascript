import { uiSearch } from "../../src/reducers/search";
import { SEARCH_QUERY_CHANGE } from "../../src/actions/search";
import { LINK_SITE_MODAL_CLOSE, LINK_SITE_SUCCESS, LINK_SITE_FAILURE } from "../../src/actions/sites";
import { LOCATION_CHANGE } from "react-router-redux";


test( 'The uiSearch processes the search query change action', () => {
	const state = {
		query: "",
	};
	const action = {
		type: SEARCH_QUERY_CHANGE,
		query: "b",
	};
	const expected = {
		query: "b",
	};

	const actual = uiSearch( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiSearch processes the link site modal close action', () => {
	const state = {
		query: "b",
	};
	const action = {
		type: LINK_SITE_MODAL_CLOSE,
	};
	const expected = {
		query: "",
	};

	const actual = uiSearch( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiSearch processes the link site success action', () => {
	const state = {
		query: "b",
	};
	const action = {
		type: LINK_SITE_SUCCESS,
	};
	const expected = {
		query: "",
	};

	const actual = uiSearch( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiSearch processes the link site failure action', () => {
	const state = {
		query: "b",
	};
	const action = {
		type: LINK_SITE_FAILURE,
	};
	const expected = {
		query: "",
	};

	const actual = uiSearch( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'The uiSearch processes the location change action', () => {
	const state = {
		query: "b",
	};
	const action = {
		type: LOCATION_CHANGE,
	};
	const expected = {
		query: "",
	};

	const actual = uiSearch( state, action );

	expect( actual ).toEqual( expected );
} );
