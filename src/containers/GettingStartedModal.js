import { connect } from "react-redux";

import GettingStartedModal from "../components/GettingStartedModal";
import { helpBeaconPopupClose } from "../actions/helpBeacon";

export const mapStateToProps = ( state ) => {
	let isOpen = state.ui.helpBeaconModal.popupOpen;

	return {
		isOpen,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		onClose: () => {
			dispatch( helpBeaconPopupClose() );
		},
	};
};

const GettingStartedModalContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( GettingStartedModal );

export default GettingStartedModalContainer;
