import PropTypes from "prop-types";
import React from "react";
import Modal from "react-modal";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import GettingStarted from "../components/GettingStarted";
import MyYoastModal from "./MyYoastModal";

const modalAriaLabel = defineMessages( {
	id: "modal.arialabel.gettingStarted",
	defaultMessage: "Getting started",
} );

/*
 * Makes the `aria-hidden="true"` attribute being applied on the root element
 * instead of the body.
 */
Modal.setAppElement( "#root" );

class GettingStartedModal extends React.Component {
	constructor( props ) {
		super( props );
	}

	/**
	 * Renders the component.
	 *
	 * @returns {ReactElement} The rendered component.
	 */
	render() {
		return (
			<MyYoastModal
				isOpen={ this.props.isOpen }
				onClose={ this.props.onClose }
				modalAriaLabel={ modalAriaLabel }
			>
				<GettingStarted
					onClose={ this.props.onClose }
				/>
			</MyYoastModal>
		);
	}
}

GettingStartedModal.propTypes = {
	className: PropTypes.string,
	intl: intlShape.isRequired,
	isOpen: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
};

GettingStartedModal.defaultProps = {
	isOpen: false,
};

export default injectIntl( GettingStartedModal );
