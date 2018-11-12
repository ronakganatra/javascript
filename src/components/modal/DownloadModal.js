import { defineMessages } from "react-intl";
import MyYoastModal from "../MyYoastModal";
import React from "react";
import PropTypes from "prop-types";
import SubscriptionDownloads from "../SubscriptionDownloads";

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
		isOpen={ props.downloadModalOpen }
		onClose={ props.onDownloadModalClose }
		modalAriaLabel={ modalAriaLabel }
	>
		<SubscriptionDownloads { ...props } />
	</MyYoastModal>
);


AddSiteModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	modalOpen: PropTypes.bool,
	downloadModalOpen: PropTypes.bool,
	onDownloadModalCloseButtonClick: PropTypes.func,
};

AddSiteModal.defaultProps = {
	modalOpen: false,
};

export default AddSiteModal;
