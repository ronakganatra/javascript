import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../src/containers/GettingStartedModal';
import { helpBeaconModalClose } from "../../src/actions/helpBeacon";

test( "the mapStateToProps function", () => {
	let state = {
		entities: {
			subscriptions: {},
			products: {},
			orders: {},
		},
		ui: {
			search: {},
			helpBeaconModal: {
				modalOpen: true,
			},
		},
	};

	let expected = {
		isOpen: true,
	};

	let actual = mapStateToProps( state );

	expect( actual ).toEqual ( expected );
} );

test( "the mapDispatchToProps function to call onClose action with helpBeaconModalClose", () => {
	const dispatch = jest.fn();

	let props = mapDispatchToProps(dispatch);

	props.onClose();

	expect( dispatch ).toHaveBeenCalledWith( helpBeaconModalClose() );
} );
