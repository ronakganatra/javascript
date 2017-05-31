import { uiHelpBeaconModalReducer } from "../../src/reducers/helpBeacon.js";
import { HELP_BEACON_POPUP_OPEN, HELP_BEACON_POPUP_CLOSE } from "../../src/actions/helpBeacon";

test( 'the help beacon popup open action', () => {
	const state = {};
	const action = {
		type: HELP_BEACON_POPUP_OPEN,
	};
	const expected = {
		popupOpen: true,
	};

	const actual = uiHelpBeaconModalReducer( state, action );

	expect( actual ).toEqual( expected );
} );

test( 'the help beacon popup close action', () => {
	const state = {
		popupOpen: true,
	};
	const action = {
		type: HELP_BEACON_POPUP_CLOSE,
	};
	const expected = {
		popupOpen: false,
	};

	const actual = uiHelpBeaconModalReducer( state, action );

	expect( actual ).toEqual( expected );
} );
