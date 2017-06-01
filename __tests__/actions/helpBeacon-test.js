import * as actions from "../../src/actions/helpBeacon";

test( 'opening help beacon pop-up action creator', () => {
	const expected = {
		type: actions.HELP_BEACON_POPUP_OPEN,
	};

	const actual = actions.helpBeaconPopupOpen( );

	expect( actual ).toEqual( expected );
} );


test( 'closing help beacon pop-up action creator', () => {
	const expected = {
		type: actions.HELP_BEACON_POPUP_CLOSE,
	};

	const actual = actions.helpBeaconPopupClose();

	expect( actual ).toEqual( expected );
} );
