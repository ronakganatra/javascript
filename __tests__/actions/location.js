import locationChange from "../../src/actions/location";

jest.mock("../../src/actions/sites", () => {
	return { retrieveSites: () => {
		return "retrieveSitesFunction"
	} }
} );
jest.mock("../../src/actions/subscriptions", () => {
	return { getAllSubscriptions: () => {
		return "getAllSubscriptions"
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

	const expected = "getAllSubscriptions";

	expect( actual ).toEqual( expected );
} );
