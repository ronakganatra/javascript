import { connect } from "react-redux";

import GettingStartedModal from "../components/GettingStartedModal";
import { helpBeaconModalClose } from "../actions/helpBeacon";

export const mapStateToProps = ( state ) => {
	const isOpen = state.ui.helpBeaconModal.modalOpen;

	return {
		isOpen,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
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
