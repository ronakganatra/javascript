import { connect } from "react-redux";

import { BeaconButton } from "../components/Button";
import { helpBeaconPopupOpen } from "../actions/helpBeacon";

export const mapStateToProps = ( state ) => {
	let isOpen = state.ui.helpBeaconModal.popupOpen;

	return {
		isOpen,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		onClick: () => {
			dispatch( helpBeaconPopupOpen() );
		},
	};
};

const BeaconButtonContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( BeaconButton );

export default BeaconButtonContainer;
