import { uiHelpBeaconModalReducer } from "../../src/reducers/helpBeacon.js";
import { HELP_BEACON_MODAL_OPEN, HELP_BEACON_MODAL_CLOSE } from "../../src/actions/helpBeacon";

test( 'the help beacon modal open action', () => {
	const state = {};
	const action = {
		type: HELP_BEACON_MODAL_OPEN,
	};
	const expected = {
		modalOpen: true,
	};

	const actual = uiHelpBeaconModalReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the help beacon modal close action', () => {
	const state = {
		modalOpen: true,
	};
	const action = {
		type: HELP_BEACON_MODAL_CLOSE,
	};
	const expected = {
		modalOpen: false,
	};

	const actual = uiHelpBeaconModalReducer( state, action );

	expect( actual ).toEqual( expected );
} );
