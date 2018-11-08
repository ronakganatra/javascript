import { defineMessages } from "react-intl";
import MyYoastModal from "../MyYoastModal";
import React from "react";
import PropTypes from "prop-types";

const modalAriaLabel = defineMessages( {
	id: "modal.arialabel.download",
	defaultMessage: "Download plugins for the subscription",
} );

/**
 * Returns the Download modal.
 *
 * @param {Object} props The props required.
 * @returns { ReactElement } The Download modal.
 */
const AddSiteModal = ( props ) => (
	<MyYoastModal
		isOpen={ props.modalOpen }
		onClose={ props.onClose }
		modalAriaLabel={ modalAriaLabel }
	>
		<p> This is the download modal </p>
	</MyYoastModal>
);


AddSiteModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	modalOpen: PropTypes.bool,
};

AddSiteModal.defaultProps = {
	modalOpen: false,
};

export default AddSiteModal;
