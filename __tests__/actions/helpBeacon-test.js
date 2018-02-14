import * as actions from "../../src/actions/helpBeacon";

test( 'opening help beacon modal action creator', () => {
	const expected = {
		type: actions.HELP_BEACON_MODAL_OPEN,
	};

	const actual = actions.helpBeaconModalOpen( );

	expect( actual ).toEqual( expected );
} );


test( 'closing help beacon modal action creator', () => {
	const expected = {
		type: actions.HELP_BEACON_MODAL_CLOSE,
	};

	const actual = actions.helpBeaconModalClose();

	expect( actual ).toEqual( expected );
} );
