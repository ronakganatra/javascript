import * as actions from "../../src/actions/search";
import { getApiUrl } from "../../src/functions/api";

jest.mock( "whatwg-fetch" );

test( 'search query change creator ', () => {
	const expected = {
		type: actions.SEARCH_QUERY_CHANGE,
		query: "teststring",
	};

	const actual = actions.onSearchQueryChange( "teststring" );

	expect( actual ).toEqual( expected );
} );
