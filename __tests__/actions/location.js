import locationChange from "../../src/actions/location";

jest.mock("../../src/actions/sites", () => {
	return { retrieveSites: () => {
		return "retrieveSitesFunction"
	} }
} );
test( 'location change action creator with /sites', () => {
	let location = {
		pathname: "/sites",
	};

	const actual = locationChange ( location );

	const expected = "retrieveSitesFunction";

	expect( actual ).toEqual( expected );
} );

test( 'location change action creator with /account', () => {
	let location = {
		pathname: "/account",
	};

	const actual = locationChange ( location );

	const expected = false;

	expect( actual ).toEqual( expected );
} );
