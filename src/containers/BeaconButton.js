import { connect } from "react-redux";

import { BeaconButton } from "../components/Button";
import { helpBeaconModalOpen } from "../actions/helpBeacon";
import { getModalOpen } from "../selectors/ui/helpBeaconModal";

/* eslint-disable require-jsdoc */
export const mapStateToProps = ( state ) => {
	return {
		isOpen: getModalOpen( state ),
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
