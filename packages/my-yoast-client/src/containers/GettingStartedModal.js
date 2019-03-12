import { connect } from "react-redux";

import GettingStartedModal from "../components/GettingStartedModal";
import { helpBeaconModalClose } from "../actions/helpBeacon";
import { getModalOpen } from "../selectors/ui/helpBeaconModal";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	return {
		isOpen: getModalOpen( state ),
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
