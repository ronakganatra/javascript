import { connect } from "react-redux";

import GettingStartedModal from "../components/GettingStartedModal";
import { helpBeaconModalClose } from "../actions/helpBeacon";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	const isOpen = state.ui.helpBeaconModal.modalOpen;

	return {
		isOpen,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {
		onClose: () => {
			dispatch( helpBeaconModalClose() );
		},
	};
};

const GettingStartedModalContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( GettingStartedModal );

export default GettingStartedModalContainer;
