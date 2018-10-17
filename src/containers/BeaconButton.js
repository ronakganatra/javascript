import { connect } from "react-redux";

import { BeaconButton } from "../components/Button";
import { helpBeaconModalOpen } from "../actions/helpBeacon";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	const isOpen = state.ui.helpBeaconModal.modalOpen;

	return {
		isOpen,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		onClick: () => {
			dispatch( helpBeaconModalOpen() );
		},
	};
};

const BeaconButtonContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( BeaconButton );

export default BeaconButtonContainer;
